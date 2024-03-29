import { FloppyDisk, X } from "@phosphor-icons/react";
import * as Popover from "@radix-ui/react-popover";
import { useState } from "react";
import { usePreferenceStore } from "../../hooks/usePreferenceStore";
import NumberInput from "../../components/NumberInput";
import { shallow } from "zustand/shallow";

export default ({ children, handleSave }) => {
  const [targetTimeInMilli, setTargetTimeInMilli] = usePreferenceStore(
    (state) => [state.targetTimeInMilli, state.setTargetTime],
    shallow
  );
  const [numberInputHours, setNumberInputHours] = useState(
    Math.trunc(targetTimeInMilli / 3600000)
  );
  const [numberInputMinutes, setNumberInputMinutes] = useState(
    Math.trunc((targetTimeInMilli % 3600000) / 60000)
  );
  const [numberInputSeconds, setNumberInputSeconds] = useState(
    Math.trunc(((targetTimeInMilli % 3600000) % 60000) / 1000)
  );

  function handleSaveClick() {
    setTargetTimeInMilli(
      numberInputHours * 3600000 +
        numberInputMinutes * 60000 +
        numberInputSeconds * 1000
    );
    handleSave();
  }

  return (
    <Popover.Root modal={true}>
      <Popover.Anchor>
        <Popover.Trigger asChild className="">
          {children}
        </Popover.Trigger>
      </Popover.Anchor>

      <Popover.Portal>
        <Popover.Content
          collisionPadding={16}
          className="relative z-50 flex flex-col gap-8 rounded-md bg-light-shade p-4 shadow-md shadow-dark-base"
        >
          <fieldset className="flex items-center gap-4">
            <NumberInput
              value={numberInputHours}
              max={99}
              min={0}
              setValue={setNumberInputHours}
            />
            <div className="font-3xl font-bold">:</div>
            <NumberInput
              value={numberInputMinutes}
              max={59}
              min={0}
              setValue={setNumberInputMinutes}
            />
            <div className="font-3xl font-bold">:</div>
            <NumberInput
              value={numberInputSeconds}
              max={59}
              min={0}
              setValue={setNumberInputSeconds}
            />
          </fieldset>
          <div className="flex justify-center gap-4">
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
