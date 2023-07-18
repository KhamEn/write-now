import { useEffect, useState, useRef } from "react";

import { EditorContent, useEditor } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import CharacterCount from "@tiptap/extension-character-count";
import History from "@tiptap/extension-history";
import Italic from "@tiptap/extension-italic";
import Bold from "@tiptap/extension-bold";
import Strike from "@tiptap/extension-strike";
import Prompter from "./components/Prompter";

import { HTMLarkdown } from "htmlarkdown";

import Timer from "./components/Timer";
import Toolbar from "./components/Toolbar";
import WordCounter from "./components/WordCounter";
import useGetAllPromptsQuery from "./hooks/useGetAllPromptsQuery";

(() => {
  const userPrefs = localStorage.getItem("write-it");
  if (userPrefs === null) {
    const DEFAULT_HOURS = 0;
    const DEFAULT_MINUTES = 5;
    const DEFAULT_SECONDS = 0;
    const DEFAULT_MILLISECONDS =
      DEFAULT_HOURS * 3600000 +
      DEFAULT_MINUTES * 60000 +
      DEFAULT_SECONDS * 1000;

    const defaultPrefs = {
      wordCounterIsEnabled: false,
      targetWordCount: 100,
      timerIsEnabled: true,
      targetTimeInMilli: DEFAULT_MILLISECONDS,
    };
    localStorage.setItem("write-it", JSON.stringify(defaultPrefs));
  }
})();

export default () => {
  const parsedUserPrefs = JSON.parse(localStorage.getItem("write-it"));

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

  // Prompts
  const { data: allPrompts, isSuccess: haveFetchedAllPrompts } =
    useGetAllPromptsQuery();
  const [prompt, setPrompt] = useState("");
  const [sourceUrl, setSourceUrl] = useState("");

  const [wordCounterIsEnabled, setWordCounterIsEnabled] = useState(
    parsedUserPrefs.wordCounterIsEnabled
  );
  const [targetWordCount, setTargetWordCount] = useState(
    parsedUserPrefs.targetWordCount
  );
  const [timerIsEnabled, setTimerIsEnabled] = useState(
    parsedUserPrefs.timerIsEnabled
  );
  const [targetTimeInMilli, setTargetTimeInMilli] = useState(
    parsedUserPrefs.targetTimeInMilli
  );

  // Misc States
  const [showOverlay, setShowOverlay] = useState(false);

  // Timer States
  const [hasBegunWriting, setHasBegunWriting] = useState(false);
  const [isNewPage, setIsNewPage] = useState(false);

  const mainRef = useRef(null);
  const scrollCallback = () => {
    mainRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  useEffect(() => {
    const newUserPrefs = {
      ...parsedUserPrefs,
      wordCounterIsEnabled: wordCounterIsEnabled,
    };
    localStorage.setItem("write-it", JSON.stringify(newUserPrefs));
  }, [wordCounterIsEnabled]);
  useEffect(() => {
    const newUserPrefs = {
      ...parsedUserPrefs,
      targetWordCount: targetWordCount,
    };
    localStorage.setItem("write-it", JSON.stringify(newUserPrefs));
  }, [targetWordCount]);
  useEffect(() => {
    const newUserPrefs = {
      ...parsedUserPrefs,
      timerIsEnabled: timerIsEnabled,
    };
    localStorage.setItem("write-it", JSON.stringify(newUserPrefs));
  }, [timerIsEnabled]);
  useEffect(() => {
    const newUserPrefs = {
      ...parsedUserPrefs,
      targetTimeInMilli: targetTimeInMilli,
    };
    localStorage.setItem("write-it", JSON.stringify(newUserPrefs));
  }, [targetTimeInMilli]);

  useEffect(() => {
    if (haveFetchedAllPrompts) {
      const topPostOfTheDay = allPrompts[0];
      setPrompt(topPostOfTheDay.prompt);
      setSourceUrl(topPostOfTheDay.url);
    }
  }, [haveFetchedAllPrompts]);

  /*
  The maximum posts that you can fetch, through reddit json api, is 100.
  And of thoses 100, some posts might not be writing prompts, so postNumber should be a few numbers below 100.
  */
  function changePrompt() {
    // The maximum is exclusive and the minimum is inclusive
    function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min) + min);
    }
    const promptNumber = getRandomInt(0, allPrompts.length);
    setPrompt(allPrompts[promptNumber].prompt);
    setSourceUrl(allPrompts[promptNumber].url);

    editor.commands.clearContent();
    setIsNewPage(true);
  }

  function exportUserWriting() {
    const htmlarkdown = new HTMLarkdown();
    const contentInHtml = editor.getHTML();
    const contentInMd = htmlarkdown.convert(contentInHtml);

    const blob = new Blob([contentInMd], { type: "text/markdown" });
    const blobUrl = window.URL.createObjectURL(blob);
    const fileName = "Prompt- " + prompt.substring(0, 35) + ".md";

    const anchorElement = document.createElement("a");
    anchorElement.setAttribute("href", blobUrl);
    anchorElement.setAttribute("download", fileName);
    anchorElement.click();
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
          className=" fixed top-0 left-0 right-0 bottom-0 z-10 h-full w-full bg-light-shade/[0.92]"
          onMouseMove={() => setShowOverlay(false)}
        ></div>
      )}

      <div className="flex h-screen flex-col gap-4 p-4 lg:flex-row xl:gap-32">
        <aside className="flex flex-wrap gap-4 lg:flex-col">
          <div>
            <Toolbar
              handleNewPromptClick={changePrompt}
              handleExportClick={exportUserWriting}
              timerIsEnabled={timerIsEnabled}
              setTimerIsEnabled={setTimerIsEnabled}
              wordCounterIsEnabled={wordCounterIsEnabled}
              setWordCounterIsEnabled={setWordCounterIsEnabled}
            />
          </div>
          {wordCounterIsEnabled && (
            <div className="min-w-[150px] max-w-[200px] flex-1 lg:w-[200px] lg:flex-none">
              <WordCounter
                wordCount={editor ? editor.storage.characterCount.words() : 0}
                targetWordCount={targetWordCount}
                setTargetWordCount={setTargetWordCount}
              />
            </div>
          )}
          {timerIsEnabled && (
            <div className="min-w-[150px] max-w-[200px] flex-1 lg:w-[200px] lg:flex-none">
              <Timer
                hasBegunWriting={hasBegunWriting}
                setHasBegunWriting={setHasBegunWriting}
                isNewPage={isNewPage}
                targetTimeInMilli={targetTimeInMilli}
                setTargetTimeInMilli={setTargetTimeInMilli}
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
          <div className="bg-light-shade">
            <Prompter prompt={prompt} redditThreadUrl={sourceUrl} />
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
