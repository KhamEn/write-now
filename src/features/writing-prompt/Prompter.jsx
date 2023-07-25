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
  const isWriting = useWriterStore((state) => state.isWriting);
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
    <article className="mx-auto rounded-md  border-dark-tint bg-light-base px-8 py-6 shadow-md shadow-dark-base">
      <p className="font-['Faune_Text'] text-xl">{prompt}</p>
      {!isWriting && (
        <div className="mt-8 flex justify-between">
          <a
            href={redditThreadUrl}
            target="_blank"
            className="w-fit px-2 underline"
          >
            reddit thread
          </a>
          <button
            onClick={changePrompt}
            className="text-blue-shade w-fit rounded border px-2 text-blue-base hover:border-blue-base hover:bg-blue-normal-AAA"
          >
            Change Prompt
          </button>
        </div>
      )}
    </article>
  );
};
