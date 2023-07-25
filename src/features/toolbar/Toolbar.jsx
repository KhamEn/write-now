import { useEffect, useRef } from "react";
import { HTMLarkdown } from "htmlarkdown";
import { List } from "@phosphor-icons/react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Switch from "@radix-ui/react-switch";
import { usePreferenceStore } from "../../hooks/usePreferenceStore";
import { shallow } from "zustand/shallow";
import { useWriterStore } from "../../hooks/useWriterStore";

export default () => {
  const [wordCounterIsEnabled, toggleWordCounter] = usePreferenceStore(
    (state) => [state.wordCounterIsEnabled, state.toggleWordCounter],
    shallow
  );
  const [timerIsEnabled, toggleTimer] = usePreferenceStore(
    (state) => [state.timerIsEnabled, state.toggleTimer],
    shallow
  );
  const contentRef = useRef(useWriterStore.getState().htmlContent);
  const promptRef = useRef(useWriterStore.getState().prompt);
  useEffect(() => {
    useWriterStore.subscribe(
      (state) => (contentRef.current = state.htmlContent)
    );
    useWriterStore.subscribe((state) => (promptRef.current = state.prompt));
  }, []);

  function exportDocument() {
    const htmlarkdown = new HTMLarkdown();
    const contentInHtml = contentRef.current;
    const contentInMd = htmlarkdown.convert(contentInHtml);

    const prompt = promptRef.current;
    const fileName = prompt.substring(1, 35) + ".md";
    const blob = new Blob([contentInMd], { type: "text/markdown" });
    const blobUrl = window.URL.createObjectURL(blob);

    const anchorElement = document.createElement("a");
    anchorElement.setAttribute("href", blobUrl);
    anchorElement.setAttribute("download", fileName);
    anchorElement.click();
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger
        className="rounded-lg bg-light-base shadow shadow-dark-base"
        aria-label="Toolbar"
      >
        <List size={38} className="rounded-lg border p-2" />
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="relative z-50 flex flex-col gap-3 rounded-lg bg-dark-base p-6 text-light-base opacity-95 shadow-md shadow-dark-base ring-0"
          collisionPadding={16}
        >
          <DropdownMenu.Arrow />
          <DropdownMenu.Item
            onSelect={(event) => {
              event.preventDefault();
              toggleWordCounter();
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
            >
              <Switch.Thumb className="block h-5 w-5 translate-x-[2px] rounded-full bg-dark-tint transition-transform will-change-transform data-[state=checked]:translate-x-[18px] data-[state=checked]:bg-blue-base" />
            </Switch.Root>
          </DropdownMenu.Item>
          <DropdownMenu.Separator className="h-[1px] bg-light-normal-AA" />
          <DropdownMenu.Item
            onSelect={exportDocument}
            className="rounded-lg p-1 hover:cursor-pointer"
          >
            Export Writing
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
