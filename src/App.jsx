import { useRef, useState } from "react";
import Toolbar from "./features/toolbar/Toolbar";
import WordCounter from "./features/word-counter/WordCounter";
import Writer from "./features/writer/Writer";
import Prompter from "./features/writing-prompt/Prompter";
import { usePreferenceStore } from "./hooks/usePreferenceStore";
import Timer from "./features/timer/Timer";

export default () => {
  const wordCounterIsEnabled = usePreferenceStore(
    (state) => state.wordCounterIsEnabled
  );
  const timerIsEnabled = usePreferenceStore((state) => state.timerIsEnabled);

  // UI States
  const [showOverlay, setShowOverlay] = useState(false);

  const mainRef = useRef(null);
  const scrollToPrompter = () => {
    mainRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  function handleEditorKeyDown(event) {
    const keyCode = event.keyCode;
    if (
      (keyCode > 47 && keyCode < 58) ||
      keyCode === 32 ||
      keyCode === 13 ||
      keyCode === 8 ||
      (keyCode > 64 && keyCode < 91) ||
      (keyCode > 95 && keyCode < 112) ||
      (keyCode > 185 && keyCode < 193) ||
      (keyCode > 218 && keyCode < 223)
    ) {
      setShowOverlay(true);
    }
  }

  return (
    <>
      {showOverlay && (
        <div
          className="fixed top-0 left-0 right-0 bottom-0 z-10 h-full w-full bg-light-shade/[0.92]"
          onMouseMove={() => setShowOverlay(false)}
        ></div>
      )}

      <div className="flex h-screen flex-col gap-4 p-4 lg:flex-row xl:gap-32">
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
          onMouseLeave={() => setShowOverlay(false)}
          ref={mainRef}
          onFocus={scrollToPrompter}
        >
          <div>
            <Prompter />
          </div>

          <div className="relative min-h-[6rem] flex-grow overflow-auto bg-light-base shadow-md shadow-dark-tint">
            {/* <EditorContent
              onFocus={() => setShowOverlay(true)}
              onBlur={() => setShowOverlay(false)}
              onMouseEnter={(event) => {
                if (document.activeElement === event.currentTarget.firstChild)
                  setShowOverlay(true);
              }}
              onKeyDown={handleEditorKeyDown}
              editor={editor}
              className="absolute h-full w-full "
            /> */}
            <Writer />
          </div>
        </main>
      </div>
    </>
  );
};
