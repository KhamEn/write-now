import { useEffect, useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import { FloppyDisk, X, GearSix } from "@phosphor-icons/react";
import NumberInput from "./NumberInput";

const DEFAULT_TARGET_WORD_COUNT = 100;

export default ({ wordCount }) => {
  // use tailwind class name, not vanilla css
  const [zIndex, setZIndex] = useState("z-0");
  const [targetWordCount, setTargetWordCount] = useState(
    DEFAULT_TARGET_WORD_COUNT
  );
  const [targetWordCountFromInput, setTargetWordCountFromInput] = useState(
    DEFAULT_TARGET_WORD_COUNT
  );

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

  function handleSaveClick() {
    setTargetWordCount(targetWordCountFromInput);
  }

  return (
    <>
      <Popover.Root modal={true}>
        <Popover.Anchor>
          <article
            className={`relative ${zIndex} rounded-md border py-2 px-4 text-dark-tint shadow-md shadow-dark-tint`}
          >
            <progress
              className="daisy-progress"
              value={wordCount}
              max={targetWordCount}
            />
            <div className="my-2 font-bold">{`${wordCount}/${targetWordCount} words`}</div>
            <section className="h-[38px]">
              <Popover.Trigger asChild className="float-right">
                <button>
                  <GearSix
                    className="rounded-full py-1"
                    weight="fill"
                    size={32}
                  />
                </button>
              </Popover.Trigger>
            </section>
          </article>
        </Popover.Anchor>
        <Popover.Portal>
          <Popover.Content
            collisionPadding={16}
            className="relative z-50 rounded-md bg-light-shade shadow-md shadow-dark-base"
          >
            <fieldset className="flex">
              <NumberInput
                value={targetWordCountFromInput}
                setValue={setTargetWordCountFromInput}
                min={0}
                max={Infinity}
                inputSize={10}
              />
            </fieldset>
            <div className="flex justify-center gap-4 p-4">
              <Popover.Close asChild>
                <button
                  onClick={handleSaveClick}
                  className="flex grow justify-center gap-1 rounded-md border border-dark-base bg-dark-base py-1 px-3 text-light-shade"
                >
                  <FloppyDisk size={24} />
                  <span>Save</span>
                </button>
              </Popover.Close>
              <Popover.Close asChild>
                <button className="flex grow justify-center gap-1 rounded-md border py-1 px-3">
                  <X size={24} />
                  <span>Cancel</span>
                </button>
              </Popover.Close>
            </div>
            <Popover.Arrow width={20} height={10} />
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </>
  );
};
