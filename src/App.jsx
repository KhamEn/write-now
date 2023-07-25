import { useRef } from "react";
import Overlay from "./components/OverlayWrapper";
import Timer from "./features/timer/Timer";
import Toolbar from "./features/toolbar/Toolbar";
import WordCounter from "./features/word-counter/WordCounter";
import Writer from "./features/writer/Writer";
import Prompter from "./features/writing-prompt/Prompter";
import { usePreferenceStore } from "./hooks/usePreferenceStore";
import { useWriterStore } from "./hooks/useWriterStore";

export default () => {
  const wordCounterIsEnabled = usePreferenceStore(
    (state) => state.wordCounterIsEnabled
  );
  const timerIsEnabled = usePreferenceStore((state) => state.timerIsEnabled);
  const isWriting = useWriterStore((state) => state.isWriting);

  const mainRef = useRef(null);
  const scrollToPrompter = () => {
    mainRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <>
      {isWriting && <Overlay />}
      <div className="flex h-screen flex-col gap-4 bg-light-shade p-4 lg:flex-row xl:gap-32">
        <aside className="flex flex-wrap gap-4 lg:flex-col">
          <div>
            <Toolbar />
          </div>
          {wordCounterIsEnabled && (
            <div className="min-w-[150px] max-w-[200px] flex-1 lg:w-[200px] lg:flex-none">
              <WordCounter />
            </div>
          )}
          {timerIsEnabled && (
            <div className="min-w-[150px] max-w-[200px] flex-1 lg:w-[200px] lg:flex-none">
              <Timer />
            </div>
          )}
        </aside>

        <main
          className="relative z-40 mx-auto flex w-full max-w-[8.5in] flex-grow flex-col gap-8 lg:flex-none xl:fixed xl:left-1/2 xl:h-screen xl:-translate-x-1/2 xl:pb-8"
          ref={mainRef}
          onFocus={scrollToPrompter}
        >
          <div>
            <Prompter />
          </div>

          <div className="relative min-h-[6rem] flex-grow overflow-auto rounded-md bg-light-base shadow-md shadow-dark-base">
            <Writer />
          </div>
        </main>
      </div>
    </>
  );
};
