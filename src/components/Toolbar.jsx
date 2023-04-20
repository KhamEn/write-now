import { List } from "@phosphor-icons/react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Switch from "@radix-ui/react-switch";

export default ({
  handleNewPromptClick,
  handleExportClick,
  timerIsEnabled,
  setTimerIsEnabled,
  wordCounterIsEnabled,
  setWordCounterIsEnabled,
}) => {
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
            onSelect={handleNewPromptClick}
            className="rounded-lg p-1 hover:cursor-pointer"
          >
            Get New Prompt
          </DropdownMenu.Item>
          <DropdownMenu.Item
            onSelect={handleExportClick}
            className="rounded-lg p-1 hover:cursor-pointer"
          >
            Export Writing
          </DropdownMenu.Item>
          <DropdownMenu.Separator className="h-[1px] bg-dark-base" />
          <DropdownMenu.Item
            onSelect={(event) => {
              event.preventDefault();
              setWordCounterIsEnabled(!wordCounterIsEnabled);
            }}
            className="rounded-lg p-1 hover:cursor-pointer"
          >
            <label className="flex w-fit gap-1 " htmlFor="word-counter-toggle">
              <span>Word Counter</span>
              <Switch.Root
                id="word-counter-toggle"
                className="daisy-toggle-success daisy-toggle"
                checked={wordCounterIsEnabled}
                onCheckedChange={(checked) => {
                  setWordCounterIsEnabled(checked);
                }}
              >
                <Switch.Thumb />
              </Switch.Root>
            </label>
          </DropdownMenu.Item>
          <DropdownMenu.Item
            onSelect={(event) => {
              event.preventDefault();
              setTimerIsEnabled(!timerIsEnabled);
            }}
            className="rounded-lg p-1 hover:cursor-pointer"
          >
            <label className="flex w-fit gap-1 " htmlFor="timer-toggle">
              <span className="">Timer</span>
              <Switch.Root
                id="timer-toggle"
                className="daisy-toggle-success daisy-toggle text-red-base"
                checked={timerIsEnabled}
                onCheckedChange={(checked) => {
                  setTimerIsEnabled(checked);
                }}
              >
                <Switch.Thumb />
              </Switch.Root>
            </label>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
