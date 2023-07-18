import { GearSix } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { usePreferenceStore } from "../hooks/usePreferenceStore";
import WordCountEditor from "./WordCountEditor";

export default ({ wordCount }) => {
  const targetWordCount = usePreferenceStore((state) => state.targetWordCount);
  // use tailwind class name, not vanilla css
  const [zIndex, setZIndex] = useState("z-0");

  useEffect(() => {
    if (wordCount > 0 && wordCount < 4) {
      setZIndex("z-30");
    } else if (
      wordCount >= targetWordCount &&
      wordCount - targetWordCount < 4
    ) {
      setZIndex("z-30");
    } else {
      setZIndex("z-0");
    }
  }, [wordCount]);

  return (
    <article
      className={`relative ${zIndex} rounded-md border py-2 px-4 text-dark-tint shadow-md shadow-dark-tint`}
    >
      <progress
        className="daisy-progress"
        value={wordCount}
        max={targetWordCount}
      />
      <p className="my-2 font-bold">{`${wordCount}/${targetWordCount} words`}</p>
      <section className="flex h-[32px] justify-end">
        <WordCountEditor>
          <button>
            <GearSix className="rounded-full py-1" weight="fill" size={32} />
          </button>
        </WordCountEditor>
      </section>
    </article>
  );
};
