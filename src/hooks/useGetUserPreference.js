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
