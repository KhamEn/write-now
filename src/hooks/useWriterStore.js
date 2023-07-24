import { create } from "zustand";

const writerStore = (set) => ({
  wordCount: 0,
  htmlContent: "",

  setWordCount: (newWordCount) => {
    set(() => ({ wordCount: newWordCount }));
  },
  setHtmlContent: (newContent) => {
    set(() => ({ htmlContent: newContent }));
  },
});

export const useWriterStore = create(writerStore);
