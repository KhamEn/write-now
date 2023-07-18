import { create } from "zustand";

const DEFAULT_HOURS = 0;
const DEFAULT_MINUTES = 5;
const DEFAULT_SECONDS = 0;
const DEFAULT_MILLISECONDS =
  DEFAULT_HOURS * 3600000 + DEFAULT_MINUTES * 60000 + DEFAULT_SECONDS * 1000;

const preferenceStore = (set) => ({
  wordCounterIsEnabled: false,
  targetWordCount: 5000,
  timerIsEnabled: true,
  targetTimeInMilli: DEFAULT_MILLISECONDS,

  toggleWordCounter: () =>
    set((state) => ({ wordCounterIsEnabled: !state.wordCounterIsEnabled })),

  setTargetWordCount: (newTarget) =>
    set(() => ({ targetWordCount: newTarget })),

  setTargetTime: (newTarget) => set(() => ({ targetTimeInMilli: newTarget })),
});

export const usePreferenceStore = create(preferenceStore);
