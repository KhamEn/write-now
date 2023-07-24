import { create } from "zustand";

const writerStore = (set) => ({
  isWriting: false,
  wordCount: 0,
  htmlContent: "",

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
