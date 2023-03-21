import { useEffect, useState } from "react";

import useGetPostsFromTodayQuery from "../hooks/useGetPostsFromTodayQuery";
import useGetPostsFromThisMonthQuery from "../hooks/useGetPostsFromThisMonthQuery";
import useGetPostsFromThisWeekQuery from "../hooks/useGetPostsFromThisWeekQuery";
import useGetPostsFromThisYearQuery from "../hooks/useGetPostsFromThisYearQuery";
import useGetPostsFromAllTimeQuery from "../hooks/useGetPostsFromAllTimeQuery";

// first post -> postNumber === 1
function getPostFromRedditPosts(posts, postNumber) {
  for (const post of posts.data.children) {
    const title = post.data.title;
    const tag = title.slice(0, 4);
    if (tag === "[WP]" || tag === "[SP]" || tag === "[EU]" || tag === "[CW]") {
      postNumber--;
      if (postNumber === 0) {
        return { title: title.slice(4), url: post.data.url };
      }
    }
  }

  return undefined;
}

export default () => {
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

  function changePrompt() {
    const isFromToday = Math.random() > 0.4;

    if (isFromToday) {
      const postNumber = Math.floor(Math.random() * 9) + 1;
      const post = getPostFromRedditPosts(todayPrompts, postNumber);
      setPrompt(post.title);
      setSourceUrl(post.url);
    } else {
      const timeline = Math.floor(Math.random() * 4) + 1;

      if (timeline === 1) {
        const postNumber = Math.floor(Math.random() * 19) + 1;
        const post = getPostFromRedditPosts(weekPrompts, postNumber);
        setPrompt(post.title);
        setSourceUrl(post.url);
      } else if (timeline === 2) {
        const postNumber = Math.floor(Math.random() * 49) + 1;
        const post = getPostFromRedditPosts(monthPrompts, postNumber);
        setPrompt(post.title);
        setSourceUrl(post.url);
      } else if (timeline === 3) {
        const postNumber = Math.floor(Math.random() * 99) + 1;
        const post = getPostFromRedditPosts(yearPrompts, postNumber);
        setPrompt(post.title);
        setSourceUrl(post.url);
      } else {
        const postNumber = Math.floor(Math.random() * 199) + 1;
        const post = getPostFromRedditPosts(allPrompts, postNumber);
        setPrompt(post.title);
        setSourceUrl(post.url);
      }
    }
  }

  return (
    <div>
      <button
        onClick={changePrompt}
        className="mb-16 rounded-2xl border-2 px-3 py-1 text-primary-base shadow-block-b hover:bg-primary-lightest hover:underline"
      >
        Get New Prompt
      </button>
      <div className="rounded-lg border border-neutral-lighter p-4 shadow-plane-bl shadow-neutral-lighter">
        <div>
          <p className="">{prompt}</p>
        </div>

        <div className="mt-4">
          <a
            href={sourceUrl}
            target="_blank"
            className="rounded-full border px-2 text-sm text-secondary-base hover:underline"
          >
            reddit thread
          </a>
        </div>
      </div>
    </div>
  );
};
