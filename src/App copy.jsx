import { useEffect, useRef, useState } from "react";

import { EditorContent, useEditor } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import CharacterCount from "@tiptap/extension-character-count";
import History from "@tiptap/extension-history";
import Italic from "@tiptap/extension-italic";
import Bold from "@tiptap/extension-bold";
import Strike from "@tiptap/extension-strike";
import Prompter from "./components/Prompter";

import { HTMLarkdown } from "htmlarkdown";

import * as Switch from "@radix-ui/react-switch";

import useGetPostsFromTodayQuery from "./hooks/useGetPostsFromTodayQuery";
import useGetPostsFromThisWeekQuery from "./hooks/useGetPostsFromThisWeekQuery";
import useGetPostsFromThisMonthQuery from "./hooks/useGetPostsFromThisMonthQuery";
import useGetPostsFromThisYearQuery from "./hooks/useGetPostsFromThisYearQuery";
import useGetPostsFromAllTimeQuery from "./hooks/useGetPostsFromAllTimeQuery";

import Timer from "./components/Timer";
import Toolbar from "./components/Toolbar";

/*
first post -> postNumber === 1
*/
function getPostFromRedditPosts(posts, postNumber) {
  for (const post of posts.data.children) {
    const title = post.data.title;
    const tag = title.slice(0, 4);
    if (tag === "[WP]" || tag === "[SP]" || tag === "[EU]" || tag === "[CW]") {
      postNumber--;
      if (postNumber < 1) {
        return { title: title.slice(4), url: post.data.url };
      }
    }
  }
  console.error("postNumber: " + postNumber);
  console.error(posts);
  throw new Error("Can't find a post.");
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export default () => {
  // Editor
  const editor = useEditor({
    editorProps: {
      attributes: {
        spellcheck: "false",
      },
    },

    extensions: [
      Document,
      Paragraph,
      Text,
      Italic,
      Bold,
      Strike,
      CharacterCount,
      History,
    ],
  });

  // Prompts
  const { data: todayPrompts, isSuccess: haveFetchedTodayPrompts } =
    useGetPostsFromTodayQuery();
  const { data: weekPrompts } = useGetPostsFromThisWeekQuery();
  const { data: monthPrompts } = useGetPostsFromThisMonthQuery();
  const { data: yearPrompts } = useGetPostsFromThisYearQuery();
  const { data: allPrompts } = useGetPostsFromAllTimeQuery();

  const [prompt, setPrompt] = useState("");
  const [promptIsEnabled, setPromptIsEnabled] = useState(true);
  const [sourceUrl, setSourceUrl] = useState("");

  useEffect(() => {
    if (haveFetchedTodayPrompts) {
      const topPostOfTheDay = getPostFromRedditPosts(todayPrompts, 1);
      setPrompt(topPostOfTheDay.title);
      setSourceUrl(topPostOfTheDay.url);
    }
  }, [haveFetchedTodayPrompts]);
  // Misc States
  const [showOverlay, setShowOverlay] = useState(false);

  /*
  The maximum posts that you can fetch, through reddit json api, is 100.
  And of thoses 100, some posts might not be writing prompts, so postNumber should be a few numbers below 100.
  */

  function changePrompt() {
    const isFromToday = Math.random() > 0.4;

    if (isFromToday) {
      const postNumber = Math.floor(Math.random() * 9) + 1;
      const post = getPostFromRedditPosts(todayPrompts, postNumber);
      setPrompt(post.title);
      setSourceUrl(post.url);
    } else {
      const timeline = getRandomInt(4);

      if (timeline === 0) {
        const postNumber = getRandomInt(20);
        const post = getPostFromRedditPosts(weekPrompts, postNumber);
        setPrompt(post.title);
        setSourceUrl(post.url);
      } else if (timeline === 1) {
        const postNumber = getRandomInt(40);
        const post = getPostFromRedditPosts(monthPrompts, postNumber);
        setPrompt(post.title);
        setSourceUrl(post.url);
      } else if (timeline === 2) {
        const postNumber = getRandomInt(70);
        const post = getPostFromRedditPosts(yearPrompts, postNumber);
        setPrompt(post.title);
        setSourceUrl(post.url);
      } else {
        const postNumber = getRandomInt(70);
        const post = getPostFromRedditPosts(allPrompts, postNumber);
        setPrompt(post.title);
        setSourceUrl(post.url);
      }
    }

    editor.commands.clearContent();
  }

  function copyUserWritingInMarkdown() {
    const htmlarkdown = new HTMLarkdown();
    const contentInHtml = editor.getHTML();
    const contentInMd = htmlarkdown.convert(contentInHtml);
    navigator.clipboard.writeText(contentInMd);
  }

  function downloadUserWriting(anchorElement) {
    const htmlarkdown = new HTMLarkdown();
    const contentInHtml = editor.getHTML();
    const contentInMd = htmlarkdown.convert(contentInHtml);
    const blob = new Blob([contentInMd], { type: "text/markdown" });
    const blobUrl = window.URL.createObjectURL(blob);
    anchorElement.setAttribute("href", blobUrl);
    anchorElement.setAttribute("download", "wrote-it.md");
  }

  function handleEditorKeyDown() {
    console.log("has begun writing: " + hasBegunWriting);
  }

  return (
    <div className="mx-auto my-12 flex max-w-screen-2xl justify-between gap-8">
      {showOverlay && (
        <div
          id="whole-screen-overlay"
          className=" fixed top-0 left-0 right-0 bottom-0 z-10 h-full w-full bg-light-shade/[0.90]"
          onMouseMove={() => setShowOverlay(false)}
        ></div>
      )}

      <aside className="writing writing-vertical-lr flex flex-col gap-4">
        <Toolbar
          handleNewPromptClick={changePrompt}
          handleCopyClick={copyUserWritingInMarkdown}
          handleExportClick={downloadUserWriting}
        />
      </aside>
      <main className="z-20" onMouseLeave={() => setShowOverlay(false)}>
        {promptIsEnabled && (
          <div className="mx-auto mb-8 max-w-[8.5in] bg-light-shade">
            <Prompter prompt={prompt} redditThreadUrl={sourceUrl} />
          </div>
        )}

        <div className="mb-8 rounded-lg shadow-md shadow-dark-tint">
          <EditorContent
            onFocus={() => setShowOverlay(true)}
            onBlur={() => setShowOverlay(false)}
            onMouseEnter={(event) => {
              if (document.activeElement === event.currentTarget.firstChild)
                setShowOverlay(true);
            }}
            onKeyDown={handleEditorKeyDown}
            editor={editor}
          />
        </div>
      </main>
      <aside className="flex flex-col gap-4">
        {/* <label className="flex w-fit gap-1" htmlFor="prompt-toggle">
              <span className="text-sm font-semibold">Prompt</span>
              <Switch.Root
                id="prompt-toggle"
                className="daisy-toggle-success daisy-toggle"
                defaultChecked
                onCheckedChange={(checked) => {
                  setPromptIsEnabled(checked);
                }}
              >
                <Switch.Thumb className="" />
              </Switch.Root>
            </label> */}
        <div className="w-fit">
          <Timer />
        </div>
      </aside>
    </div>
  );
};
