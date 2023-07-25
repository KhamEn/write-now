import { create } from "zustand";

const writerStore = (set) => ({
  prompt: "",
  isWriting: false,
  wordCount: 0,
  htmlContent: "",

  setPrompt: (newPrompt) => {
    set(() => ({ prompt: newPrompt }));
  },

  setIsWriting: (newStatus) => {
    set(() => ({ isWriting: newStatus }));
  },

  setWordCount: (newWordCount) => {
    set(() => ({ wordCount: newWordCount }));
  },

  setHtmlContent: (newContent) => {
    set(() => ({ htmlContent: newContent }));
  },
});

export const useWriterStore = create(writerStore);
