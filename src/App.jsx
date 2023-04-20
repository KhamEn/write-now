import { useEffect, useState, useRef } from "react";

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

import useGetPostsFromTodayQuery from "./hooks/useGetPostsFromTodayQuery";
import useGetPostsFromThisWeekQuery from "./hooks/useGetPostsFromThisWeekQuery";
import useGetPostsFromThisMonthQuery from "./hooks/useGetPostsFromThisMonthQuery";
import useGetPostsFromThisYearQuery from "./hooks/useGetPostsFromThisYearQuery";
import useGetPostsFromAllTimeQuery from "./hooks/useGetPostsFromAllTimeQuery";

import Timer from "./components/Timer";
import Toolbar from "./components/Toolbar";
import WordCounter from "./components/WordCounter";

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
  const [sourceUrl, setSourceUrl] = useState("");

  const [wordCounterIsEnabled, setWordCounterIsEnabled] = useState(false);
  const [timerIsEnabled, setTimerIsEnabled] = useState(true);

  useEffect(() => {
    if (haveFetchedTodayPrompts) {
      const topPostOfTheDay = getPostFromRedditPosts(todayPrompts, 1);
      setPrompt(topPostOfTheDay.title);
      setSourceUrl(topPostOfTheDay.url);
    }
  }, [haveFetchedTodayPrompts]);
  // Misc States
  const [showOverlay, setShowOverlay] = useState(false);

  // Timer States
  const [hasBegunWriting, setHasBegunWriting] = useState(false);
  const [isNewPage, setIsNewPage] = useState(false);

  const mainRef = useRef(null);
  const scrollCallback = () => {
    mainRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
  };
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
    setIsNewPage(true);
  }

  function exportUserWriting() {
    const htmlarkdown = new HTMLarkdown();
    const contentInHtml = editor.getHTML();
    const contentInMd = htmlarkdown.convert(contentInHtml);

    const blob = new Blob([contentInMd], { type: "text/markdown" });
    const blobUrl = window.URL.createObjectURL(blob);
    const fileName = "Prompt- " + prompt.substring(0, 35) + ".md";

    const anchorElement = document.createElement("a");
    anchorElement.setAttribute("href", blobUrl);
    anchorElement.setAttribute("download", fileName);
    anchorElement.click();
  }

  function handleEditorKeyDown(event) {
    const keyCode = event.keyCode;
    if (
      (keyCode > 47 && keyCode < 58) ||
      keyCode === 32 ||
      keyCode === 13 ||
      keyCode === 8 ||
      (keyCode > 64 && keyCode < 91) ||
      (keyCode > 95 && keyCode < 112) ||
      (keyCode > 185 && keyCode < 193) ||
      (keyCode > 218 && keyCode < 223)
    ) {
      setShowOverlay(true);

      if (!hasBegunWriting) {
        setHasBegunWriting(true);
        setIsNewPage(false);
      }
    }
  }

  return (
    <>
      {showOverlay && (
        <div
          className=" fixed top-0 left-0 right-0 bottom-0 z-10 h-full w-full bg-light-shade/[0.92]"
          onMouseMove={() => setShowOverlay(false)}
        ></div>
      )}

      <div className="flex h-screen flex-col gap-4 p-4 lg:flex-row">
        <aside className="mb-4 flex flex-wrap gap-4 lg:flex-col">
          <div className="">
            <Toolbar
              handleNewPromptClick={changePrompt}
              handleExportClick={exportUserWriting}
              timerIsEnabled={timerIsEnabled}
              setTimerIsEnabled={setTimerIsEnabled}
              wordCounterIsEnabled={wordCounterIsEnabled}
              setWordCounterIsEnabled={setWordCounterIsEnabled}
            />
          </div>
          <div className="min-w-[150px] max-w-[250px] flex-1 lg:w-[250px] lg:flex-none">
            {wordCounterIsEnabled && (
              <WordCounter
                wordCount={editor ? editor.storage.characterCount.words() : 0}
              />
            )}
          </div>
          <div className="min-w-[150px] max-w-[250px] flex-1 lg:w-[250px] lg:flex-none">
            {timerIsEnabled && (
              <Timer
                hasBegunWriting={hasBegunWriting}
                setHasBegunWriting={setHasBegunWriting}
                isNewPage={isNewPage}
              />
            )}
          </div>
        </aside>

        <main
          className="relative z-40 mx-auto flex w-full max-w-[8.5in] flex-grow flex-col gap-8"
          onMouseLeave={() => setShowOverlay(false)}
          ref={mainRef}
          onFocus={scrollCallback}
        >
          <div className=" bg-light-shade">
            <Prompter prompt={prompt} redditThreadUrl={sourceUrl} />
          </div>

          <div className=" relative min-h-[6rem] flex-grow overflow-auto bg-light-base shadow-md shadow-dark-tint">
            <EditorContent
              onFocus={() => setShowOverlay(true)}
              onBlur={() => setShowOverlay(false)}
              onMouseEnter={(event) => {
                if (document.activeElement === event.currentTarget.firstChild)
                  setShowOverlay(true);
              }}
              onKeyDown={handleEditorKeyDown}
              editor={editor}
              className="absolute h-full w-full "
            />
          </div>
        </main>
      </div>
    </>
  );
};
