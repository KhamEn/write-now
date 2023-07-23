import { List } from "@phosphor-icons/react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Switch from "@radix-ui/react-switch";
import { usePreferenceStore } from "../../hooks/usePreferenceStore";
import { shallow } from "zustand/shallow";

export default ({ getExportInfo }) => {
  const [wordCounterIsEnabled, toggleWordCounter] = usePreferenceStore(
    (state) => [state.wordCounterIsEnabled, state.toggleWordCounter],
    shallow
  );
  const [timerIsEnabled, toggleTimer] = usePreferenceStore(
    (state) => [state.timerIsEnabled, state.toggleTimer],
    shallow
  );

  function onExportClick() {
    const { contentInMd, fileName } = getExportInfo();
    const blob = new Blob([contentInMd], { type: "text/markdown" });
    const blobUrl = window.URL.createObjectURL(blob);

    const anchorElement = document.createElement("a");
    anchorElement.setAttribute("href", blobUrl);
    anchorElement.setAttribute("download", fileName);
    anchorElement.click();
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="rounded-lg">
        <List size={38} className="rounded-lg border p-2" />
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="relative z-50 flex flex-col gap-3 rounded-lg border bg-light-shade p-3 shadow-md shadow-dark-base ring-0"
          collisionPadding={16}
        >
          <DropdownMenu.Arrow />
          <DropdownMenu.Item
            onSelect={(event) => {
              event.preventDefault();
              toggleWordCounter();
              console.log("Called");
            }}
            className="flex justify-between gap-1 rounded-lg p-1 hover:cursor-pointer"
          >
            <DropdownMenu.Label className="flex w-fit gap-1 hover:cursor-pointer">
              Word Counter
            </DropdownMenu.Label>
            <Switch.Root
              className="relative h-[26px] w-[42px] rounded-full border border-dark-base bg-light-base data-[state=checked]:border-blue-base data-[state=checked]:bg-blue-normal-AAA"
              checked={wordCounterIsEnabled}
            >
              <Switch.Thumb className="block h-5 w-5 translate-x-[2px] rounded-full bg-dark-tint transition-transform will-change-transform data-[state=checked]:translate-x-[18px] data-[state=checked]:bg-blue-base" />
            </Switch.Root>
          </DropdownMenu.Item>
          <DropdownMenu.Item
            onSelect={(event) => {
              event.preventDefault();
              toggleTimer();
            }}
            className="flex  justify-between gap-1 rounded-lg p-1 hover:cursor-pointer"
          >
            <DropdownMenu.Label>Timer</DropdownMenu.Label>
            <Switch.Root
              className="relative h-[26px] w-[42px] rounded-full border border-dark-base bg-light-base data-[state=checked]:border-blue-base data-[state=checked]:bg-blue-normal-AAA"
              checked={timerIsEnabled}
              onCheckedChange={(checked) => {
                toggleTimer();
              }}
            >
              <Switch.Thumb className="block h-5 w-5 translate-x-[2px] rounded-full bg-dark-tint transition-transform will-change-transform data-[state=checked]:translate-x-[18px] data-[state=checked]:bg-blue-base" />
            </Switch.Root>
          </DropdownMenu.Item>
          <DropdownMenu.Separator className="h-[1px] bg-dark-base" />
          <DropdownMenu.Item
            onSelect={onExportClick}
            className="rounded-lg p-1 hover:cursor-pointer"
          >
            Export Writing
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
