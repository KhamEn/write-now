import { useEffect, useState } from "react";
import useGetAllPromptsQuery from "./useGetAllPromptsQuery";
import { useWriterStore } from "../../hooks/useWriterStore";
import { shallow } from "zustand/shallow";

// The maximum is exclusive and the minimum is inclusive
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

export default () => {
  const { data: allPrompts, isSuccess: haveFetchedAllPrompts } =
    useGetAllPromptsQuery();
  const [prompt, setPrompt] = useWriterStore(
    (state) => [state.prompt, state.setPrompt],
    shallow
  );
  const [redditThreadUrl, setSourceUrl] = useState("");

  useEffect(() => {
    if (haveFetchedAllPrompts) {
      const topPostOfTheDay = allPrompts[0];
      setPrompt(topPostOfTheDay.prompt);
      setSourceUrl(topPostOfTheDay.url);
    }
  }, [haveFetchedAllPrompts]);

  /*
  The maximum posts that you can fetch, through reddit json api, is 100.
  And of thoses 100, some posts might not be writing prompts, so postNumber should be a few numbers below 100.
  */
  function changePrompt() {
    const promptNumber = getRandomInt(0, allPrompts.length);
    setSourceUrl(allPrompts[promptNumber].url);
    setPrompt(allPrompts[promptNumber].prompt);
  }

  return (
    <article className="mx-auto rounded border border-dark-tint p-8 shadow-plane-bl shadow-dark-tint">
      <p className="font-['Faune_Text'] text-xl">{prompt}</p>
      <a
        href={redditThreadUrl}
        target="_blank"
        className="text-blue-shade mt-4 block w-fit rounded-full border px-2 text-sm underline"
      >
        reddit thread
      </a>{" "}
      <button
        onClick={changePrompt}
        className="text-blue-shade mt-4 block w-fit rounded-full border px-2 text-sm underline"
      >
        change prompt
      </button>
    </article>
  );
};
