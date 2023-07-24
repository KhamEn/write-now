import Bold from "@tiptap/extension-bold";
import CharacterCount from "@tiptap/extension-character-count";
import Document from "@tiptap/extension-document";
import History from "@tiptap/extension-history";
import Italic from "@tiptap/extension-italic";
import Paragraph from "@tiptap/extension-paragraph";
import Strike from "@tiptap/extension-strike";
import Text from "@tiptap/extension-text";
import { Editor, EditorContent } from "@tiptap/react";
import { useWriterStore } from "../../hooks/useWriterStore";

export default () => {
  const [wordCount, setWordCount] = useWriterStore((state) => [
    state.wordCount,
    state.setWordCount,
  ]);
  const setHtmlContent = useWriterStore((state) => state.setHtmlContent);

  const editor = new Editor({
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
  });

  if (!editor) return null;

  editor.on("update", ({ editor }) => {
    setHtmlContent(editor.getHTML());
    const currentWordCount = editor.storage.characterCount.words();
    if (currentWordCount !== wordCount) {
      setWordCount(currentWordCount);
    }
  });

  return (
    <EditorContent
      editor={editor}
      className="absolute h-full w-full overflow-hidden"
    />
  );
};
