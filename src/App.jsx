import { useRef, useState } from "react";

import Bold from "@tiptap/extension-bold";
import CharacterCount from "@tiptap/extension-character-count";
import Document from "@tiptap/extension-document";
import History from "@tiptap/extension-history";
import Italic from "@tiptap/extension-italic";
import Paragraph from "@tiptap/extension-paragraph";
import Strike from "@tiptap/extension-strike";
import Text from "@tiptap/extension-text";
import { EditorContent, useEditor } from "@tiptap/react";
import Prompter from "./features/writing-prompt/Prompter";

import { HTMLarkdown } from "htmlarkdown";
import Timer from "./features/timer/Timer";
import Toolbar from "./features/toolbar/Toolbar";
import WordCounter from "./features/word-counter/WordCounter";
import { usePreferenceStore } from "./hooks/usePreferenceStore";

export default () => {
  // Editor
  const editor = useEditor({
    editorProps: {
      attributes: {
        spellcheck: "false",
      },
    },

    extensions: [
      Document,
      Paragraph,
      Text,
      Italic,
      Bold,
      Strike,
      CharacterCount,
      History,
    ],
  });

  const wordCounterIsEnabled = usePreferenceStore(
    (state) => state.wordCounterIsEnabled
  );
  const timerIsEnabled = usePreferenceStore((state) => state.timerIsEnabled);

  // UI States
  const [showOverlay, setShowOverlay] = useState(false);

  // Timer States
  const [hasBegunWriting, setHasBegunWriting] = useState(false);
  const [isNewPage, setIsNewPage] = useState(false);

  const mainRef = useRef(null);
  const scrollCallback = () => {
    mainRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  function createNewPage() {
    editor.commands.clearContent();
    setIsNewPage(true);
  }

  function getExportInfo() {
    const htmlarkdown = new HTMLarkdown();
    const contentInHtml = editor.getHTML();
    const contentInMd = htmlarkdown.convert(contentInHtml);
    const fileName = editor.getText().substring(0, 35) + ".md";

    return { contentInMd, fileName };
  }

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

      if (!hasBegunWriting) {
        setHasBegunWriting(true);
        setIsNewPage(false);
      }
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
            <Toolbar getExportInfo={getExportInfo} />
          </div>
          {wordCounterIsEnabled && (
            <div className="min-w-[150px] max-w-[200px] flex-1 lg:w-[200px] lg:flex-none">
              <WordCounter
                wordCount={editor ? editor.storage.characterCount.words() : 0}
              />
            </div>
          )}
          {timerIsEnabled && (
            <div className="min-w-[150px] max-w-[200px] flex-1 lg:w-[200px] lg:flex-none">
              <Timer
                hasBegunWriting={hasBegunWriting}
                setHasBegunWriting={setHasBegunWriting}
                isNewPage={isNewPage}
              />
            </div>
          )}
        </aside>

        <main
          className="relative z-40 mx-auto flex w-full max-w-[8.5in] flex-grow flex-col gap-8 lg:flex-none xl:fixed xl:left-1/2 xl:h-screen xl:-translate-x-1/2 xl:pb-8"
          onMouseLeave={() => setShowOverlay(false)}
          ref={mainRef}
          onFocus={scrollCallback}
        >
          <div>
            <Prompter onPromptChange={createNewPage} />
          </div>

          <div className="relative min-h-[6rem] flex-grow overflow-auto bg-light-base shadow-md shadow-dark-tint">
            <EditorContent
              onFocus={() => setShowOverlay(true)}
              onBlur={() => setShowOverlay(false)}
              onMouseEnter={(event) => {
                if (document.activeElement === event.currentTarget.firstChild)
                  setShowOverlay(true);
              }}
              onKeyDown={handleEditorKeyDown}
              editor={editor}
              className="absolute h-full w-full "
            />
          </div>
        </main>
      </div>
    </>
  );
};
