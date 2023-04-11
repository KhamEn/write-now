import * as Switch from "@radix-ui/react-switch";

export default ({
  handleNewPromptClick,
  handleExportClick,
  setWordCounterIsEnabled,
  setTimerIsEnabled,
}) => {
  return (
    <article className="mx-auto flex justify-between py-4 px-2">
      <div className="flex gap-4">
        <button
          onClick={handleNewPromptClick}
          className="rounded-2xl border-2 px-3 py-1 text-blue-base shadow-block-b hover:bg-blue-normal-AAA "
        >
          Get New Prompt
        </button>
        <button className="rounded-2xl border-2 px-3 py-1 text-dark-base shadow-block-b  hover:bg-dark-normal-AAA ">
          <a onClick={(event) => handleExportClick(event.target)}>
            Export Writing
          </a>
        </button>
      </div>
      <div className="flex items-center gap-4">
        <label className="flex w-fit gap-1" htmlFor="timer-toggle">
          <span className="text-sm font-semibold">Timer</span>
          <Switch.Root
            id="timer-toggle"
            className="daisy-toggle-success daisy-toggle"
            defaultChecked
            onCheckedChange={(checked) => {
              setTimerIsEnabled(checked);
            }}
          >
            <Switch.Thumb className="" />
          </Switch.Root>
        </label>
        <label className="flex w-fit gap-1" htmlFor="word-counter-toggle">
          <span className="text-sm font-semibold">Word Counter</span>
          <Switch.Root
            id="word-counter-toggle"
            className="daisy-toggle-success daisy-toggle"
            onCheckedChange={(checked) => {
              setWordCounterIsEnabled(checked);
            }}
          >
            <Switch.Thumb className="" />
          </Switch.Root>
        </label>
      </div>
    </article>
  );
};
