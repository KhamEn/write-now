import { FloppyDisk, X } from "@phosphor-icons/react";
import * as Popover from "@radix-ui/react-popover";
import { useState } from "react";
import { usePreferenceStore } from "../hooks/usePreferenceStore";
import NumberInput from "./NumberInput";

export default ({ children }) => {
  const targetWordCount = usePreferenceStore((state) => state.targetWordCount);
  const setTargetWordCount = usePreferenceStore(
    (state) => state.setTargetWordCount
  );
  const [inputValue, setInputValue] = useState(targetWordCount);

  function handleSaveClick() {
    setTargetWordCount(inputValue);
  }

  return (
    <Popover.Root modal={true}>
      <Popover.Anchor>
        <Popover.Trigger asChild>{children}</Popover.Trigger>
      </Popover.Anchor>
      <Popover.Portal>
        <Popover.Content
          collisionPadding={16}
          className="relative z-50 rounded-md bg-light-shade shadow-md shadow-dark-base"
        >
          <fieldset className="flex">
            <NumberInput
              value={inputValue}
              setValue={setInputValue}
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
  );
};
