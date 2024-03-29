import { ArrowCounterClockwise, GearSix, Pause } from "@phosphor-icons/react";
import { useCallback, useEffect, useState } from "react";
import { useTimer } from "react-use-precision-timer";
import { usePreferenceStore } from "../../hooks/usePreferenceStore";
import TimeEditor from "./TimeEditor";
import { useWriterStore } from "../../hooks/useWriterStore";
import { shallow } from "zustand/shallow";

function printTimeInHumanReadableFormat(milliseconds) {
  if (milliseconds < 1) {
    return "00:00:00";
  }
  //Get hours from milliseconds
  var hours = milliseconds / (1000 * 60 * 60);
  var absoluteHours = Math.floor(hours);
  var h = absoluteHours > 9 ? absoluteHours : "0" + absoluteHours;

  //Get remainder from hours and convert to minutes
  var minutes = (hours - absoluteHours) * 60;
  var absoluteMinutes = Math.floor(minutes);
  var m = absoluteMinutes > 9 ? absoluteMinutes : "0" + absoluteMinutes;

  //Get remainder from minutes and convert to seconds
  var seconds = (minutes - absoluteMinutes) * 60;
  var absoluteSeconds = Math.floor(seconds);
  var s = absoluteSeconds > 9 ? absoluteSeconds : "0" + absoluteSeconds;

  return h + ":" + m + ":" + s;
}

const MILLISECONDS_CONVERSION_BUFFER = 100;

export default () => {
  const prompt = useWriterStore((state) => state.prompt); // Implement observer pattern
  const [isWriting, setIsWriting] = useWriterStore(
    (state) => [state.isWriting, state.setIsWriting],
    shallow
  );
  const targetTimeInMilli = usePreferenceStore(
    (state) => state.targetTimeInMilli
  );
  const [tailwindZIndex, setTailwindZIndex] = useState("");
  const [remainingTime, setRemainingTime] = useState(
    targetTimeInMilli + MILLISECONDS_CONVERSION_BUFFER
  );
  const [isCompleted, setIsCompleted] = useState(false);
  const callback = useCallback(() => {
    const elapsedTime = timer.getElapsedRunningTime();

    setRemainingTime(
      targetTimeInMilli - elapsedTime + MILLISECONDS_CONVERSION_BUFFER
    );

    if (elapsedTime > targetTimeInMilli) {
      setIsCompleted(true);
      timer.stop();
    }
  }, [targetTimeInMilli]);
  const timer = useTimer({ delay: 1000 }, callback);

  useEffect(
    () => setRemainingTime(targetTimeInMilli + MILLISECONDS_CONVERSION_BUFFER),
    [targetTimeInMilli]
  );

  useEffect(() => {
    if (isWriting) {
      startTimer();
      // Put the timer above the overlay.
      setTailwindZIndex("z-30");

      const delayer = setTimeout(() => {
        // Put the timer under the overlay.
        setTailwindZIndex("");
      }, 3000);
      return () => clearTimeout(delayer);
    } else {
      pauseTimer();
    }
  }, [isWriting]);

  useEffect(() => {
    // isCompleted is required because isStopped() doesn't distinguish between not having started vs being stopped

    if (timer.isStopped() && isCompleted) {
      setTailwindZIndex("z-30");
      const delayer = setTimeout(() => {
        // Put the timer under the overlay.
        setTailwindZIndex("");
      }, 3000);

      return () => clearTimeout(delayer);
    }
  }, [timer.isStopped()]);

  useEffect(() => {
    resetTimer();
  }, [prompt]);

  function startTimer() {
    if (timer.isPaused()) {
      timer.resume();
    } else {
      timer.start();
      setIsCompleted(false);
    }
  }

  function pauseTimer() {
    timer.pause();
    setIsWriting(false);
  }

  function resetTimer() {
    timer.stop();
    setRemainingTime(targetTimeInMilli + MILLISECONDS_CONVERSION_BUFFER);
    setIsCompleted(false);
    setIsWriting(false);
  }

  function getProgressValue() {
    let value = timer.getElapsedRunningTime();
    if (value < 1 && isCompleted) {
      value = targetTimeInMilli;
    }

    return value;
  }

  return (
    <article
      className={`relative ${tailwindZIndex} rounded-3xl bg-light-base py-2 px-4 text-dark-tint shadow shadow-dark-base`}
    >
      <progress
        value={getProgressValue()}
        max={targetTimeInMilli}
        className="w-full"
      >
        timer progress
      </progress>
      <p className="my-2 font-bold">
        {printTimeInHumanReadableFormat(remainingTime)}
      </p>
      <section className="flex h-[32px] justify-between">
        <div>
          <button
            onClick={pauseTimer}
            className="mr-2 text-blue-base disabled:text-light-large-AA disabled:hover:cursor-default"
            disabled={!timer.isRunning()}
            aria-label="Pause timer"
          >
            <Pause
              className="rounded-full border p-1"
              weight="fill"
              size={32}
            />
          </button>
          <button
            onClick={resetTimer}
            className="text-blue-base disabled:text-light-large-AA disabled:hover:cursor-default"
            disabled={
              !timer.isStarted() &&
              remainingTime > MILLISECONDS_CONVERSION_BUFFER
            }
            aria-label="Reset timer"
          >
            <ArrowCounterClockwise
              className="rounded-full border p-1"
              weight="fill"
              size={32}
            />
          </button>
        </div>

        <TimeEditor handleSave={resetTimer}>
          <button aria-label="Change target time">
            <GearSix className="rounded-full py-1" weight="fill" size={32} />
          </button>
        </TimeEditor>
      </section>
    </article>
  );
};
