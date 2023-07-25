import Bold from "@tiptap/extension-bold";
import CharacterCount from "@tiptap/extension-character-count";
import Document from "@tiptap/extension-document";
import History from "@tiptap/extension-history";
import Italic from "@tiptap/extension-italic";
import Paragraph from "@tiptap/extension-paragraph";
import Strike from "@tiptap/extension-strike";
import Text from "@tiptap/extension-text";
import { Editor, EditorContent } from "@tiptap/react";
import { useEffect, useRef, useState } from "react";
import { useWriterStore } from "../../hooks/useWriterStore";

export default () => {
  const [editor] = useState(
    new Editor({
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
        CharacterCount.configure(),
        History,
      ],
    })
  );
  if (!editor) return null;

  const prompt = useWriterStore((state) => state.prompt); // Observer pattern
  const setIsWriting = useWriterStore((state) => state.setIsWriting);
  const setWordCount = useWriterStore((state) => state.setWordCount);
  const setHtmlContent = useWriterStore((state) => state.setHtmlContent);
  const isWritingRef = useRef(useWriterStore.getState().isWriting);
  const wordCountRef = useRef(useWriterStore.getState().wordCount);
  useEffect(() => {
    useWriterStore.subscribe(
      (state) => (wordCountRef.current = state.wordCount)
    );
    useWriterStore.subscribe(
      (state) => (isWritingRef.current = state.isWriting)
    );
  }, []);

  useEffect(() => {
    editor.commands.clearContent(false);
    setWordCount(0);
  }, [prompt]);

  editor.on("update", ({ editor }) => {
    const currentWordCount = editor.storage.characterCount.words();
    const previousWordCount = wordCountRef.current;
    const isWriting = isWritingRef.current;

    setHtmlContent(editor.getHTML());

    if (currentWordCount !== previousWordCount) {
      setWordCount(currentWordCount);
    }

    if (!isWriting) {
      setIsWriting(true);
    }
  });

  function handleNonWritingActivity() {
    const isWriting = isWritingRef.current;

    if (isWriting) {
      setIsWriting(false);
    }
  }

  return (
    <EditorContent
      editor={editor}
      className="absolute h-full w-full overflow-hidden"
      onMouseLeave={handleNonWritingActivity}
      onBlur={handleNonWritingActivity}
    />
  );
};
