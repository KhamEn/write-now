import { create } from "zustand";
import { persist } from "zustand/middleware";

const DEFAULT_HOURS = 0;
const DEFAULT_MINUTES = 5;
const DEFAULT_SECONDS = 30;
const DEFAULT_MILLISECONDS =
  DEFAULT_HOURS * 3600000 + DEFAULT_MINUTES * 60000 + DEFAULT_SECONDS * 1000;

const preferenceStore = (set, get) => ({
  wordCounterIsEnabled: false,
  targetWordCount: 10,
  timerIsEnabled: true,
  targetTimeInMilli: DEFAULT_MILLISECONDS,

  toggleWordCounter: () => {
    set((state) => ({
      wordCounterIsEnabled: !state.wordCounterIsEnabled,
    }));
  },

  setTargetWordCount: (newTarget) =>
    set(() => ({ targetWordCount: newTarget })),

  toggleTimer: () =>
    set((state) => ({ timerIsEnabled: !state.timerIsEnabled })),

  setTargetTime: (newTarget) => set(() => ({ targetTimeInMilli: newTarget })),
});

export const usePreferenceStore = create(
  persist(preferenceStore, { name: "zustand-write-it" })
);
