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

  const [prompt, setPrompt] = useState("");
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
    <div className="card bg-base-200 shadow-lg shadow-base-300">
      <div className="card-body">
        <p className="prose-xl prose font-serif">{prompt}</p>
        <div className="card-actions justify-end">
          <button onClick={changePrompt} className="btn-secondary btn">
            New Prompt
          </button>
          <a href={sourceUrl} target="_blank" className="badge">
            reddit thread
          </a>
        </div>
      </div>
    </div>
  );
};
