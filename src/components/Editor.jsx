import { EditorContent, useEditor } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import CharacterCount from "@tiptap/extension-character-count";
import Italic from "@tiptap/extension-italic";
import Bold from "@tiptap/extension-bold";
import Strike from "@tiptap/extension-strike";

export default () => {
  const editor = useEditor({
    content: sessionStorage.getItem("WriteNow")
      ? sessionStorage.getItem("WriteNow")
      : "",

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
    ],

    onUpdate: ({ editor }) => {
      const json = editor.getJSON();
      sessionStorage.setItem("WriteNow", editor.view.dom.innerText);
    },
  });

  return <EditorContent editor={editor} />;
};
