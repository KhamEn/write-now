import { useEffect, useState } from "react";

import { EditorContent, useEditor } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import CharacterCount from "@tiptap/extension-character-count";
import Italic from "@tiptap/extension-italic";
import Bold from "@tiptap/extension-bold";
import Strike from "@tiptap/extension-strike";
import Prompter from "./components/Prompter";

import useGetPostsFromTodayQuery from "./hooks/useGetPostsFromTodayQuery";
import useGetPostsFromThisWeekQuery from "./hooks/useGetPostsFromThisWeekQuery";
import useGetPostsFromThisMonthQuery from "./hooks/useGetPostsFromThisMonthQuery";
import useGetPostsFromThisYearQuery from "./hooks/useGetPostsFromThisYearQuery";
import useGetPostsFromAllTimeQuery from "./hooks/useGetPostsFromAllTimeQuery";

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

function App() {
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
    ],
  });

  const { data: todayPrompts, isSuccess: haveFetchedTodayPrompts } =
    useGetPostsFromTodayQuery();
  const { data: weekPrompts } = useGetPostsFromThisWeekQuery();
  const { data: monthPrompts } = useGetPostsFromThisMonthQuery();
  const { data: yearPrompts } = useGetPostsFromThisYearQuery();
  const { data: allPrompts } = useGetPostsFromAllTimeQuery();

  const [prompt, setPrompt] = useState(
    "He wants to build a web app, but someone keeps messsing with his internet."
  );
  const [sourceUrl, setSourceUrl] = useState("");

  useEffect(() => {
    if (haveFetchedTodayPrompts) {
      const topPostOfTheDay = getPostFromRedditPosts(todayPrompts, 1);
      setPrompt(topPostOfTheDay.title);
      setSourceUrl(topPostOfTheDay.url);
    }
  }, [haveFetchedTodayPrompts]);

  /*
  The maximum posts that you can fetch, through reddit json api, is 100.
  And some posts might not be writing prompts, so postNumber should be a few numbers below 100.
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

  return (
    <div className="p-2">
      <button
        onClick={changePrompt}
        className="mb-16 rounded-2xl border-2 px-3 py-1 text-primary-base shadow-block-b hover:bg-primary-lightest hover:underline"
      >
        Get New Prompt
      </button>
      <div className="mx-auto my-8 max-w-[8.5in]">
        <Prompter prompt={prompt} redditThreadUrl={sourceUrl} />
      </div>
      <div className="mb-8">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

export default App;
