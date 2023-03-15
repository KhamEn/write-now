import { EditorContent, useEditor } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import CharacterCount from "@tiptap/extension-character-count";

export default () => {
  const editor = useEditor({
    extensions: [Document, Paragraph, Text, CharacterCount],
    // intial content
    content: "",
    // content: localStorage.getItem("WriteNow")
    //   ? localStorage.getItem("WriteNow")
    //   : "Apparently there's not",
    // triggered on every change
    // onUpdate: ({ editor }) => {
    //   const json = editor.getJSON();
    //   // send the content to an API here
    //   localStorage.setItem("WriteNow", editor.view.dom.innerText);
    // },
  });

  return <EditorContent editor={editor} />;
};
