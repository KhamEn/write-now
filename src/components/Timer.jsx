import * as Popover from "@radix-ui/react-popover";
import { useState, useCallback, useEffect } from "react";
import { useTimer } from "react-use-precision-timer";
import {
  Play,
  Pause,
  ArrowCounterClockwise,
  FloppyDisk,
  X,
} from "@phosphor-icons/react";

import NumberInput from "./NumberInput";

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

const DEFAULT_HOURS = 0;
const DEFAULT_MINUTES = 5;
const DEFAULT_SECONDS = 0;
const DEFAULT_MILLISECONDS =
  DEFAULT_HOURS * 3600000 + DEFAULT_MINUTES * 60000 + DEFAULT_SECONDS * 1000;
const MILLISECONDS_CONVERSION_BUFFER = 100;
const FULL_PERCENTAGE_LEFT = 99;

export default ({ hasBegunWriting, setHasBegunWriting, isNewPage }) => {
  // Countdown Timer states begin
  const [targetTimeInMilli, setTargetTimeInMilli] =
    useState(DEFAULT_MILLISECONDS);
  const [percentageLeft, setTimeLeftPercentage] =
    useState(FULL_PERCENTAGE_LEFT);
  const [remainingTime, setRemainingTime] = useState(
    targetTimeInMilli + MILLISECONDS_CONVERSION_BUFFER
  );
  const callback = useCallback(() => {
    const elapsedTime = timer.getElapsedRunningTime();

    setRemainingTime(
      targetTimeInMilli - elapsedTime + MILLISECONDS_CONVERSION_BUFFER
    );

    setTimeLeftPercentage(() =>
      Math.round(100 - (elapsedTime / targetTimeInMilli) * 100)
    );

    if (elapsedTime > targetTimeInMilli) {
      timer.stop();
    }
  }, [targetTimeInMilli]);
  const timer = useTimer({ delay: 1000 }, callback);

  useEffect(
    () => setRemainingTime(targetTimeInMilli + MILLISECONDS_CONVERSION_BUFFER),
    [targetTimeInMilli]
  );
  // Countdown Timer states end

  // Edit Timer states begin
  const [numberInputHours, setNumberInputHours] = useState(DEFAULT_HOURS);
  const [numberInputMinutes, setNumberInputMinutes] = useState(DEFAULT_MINUTES);
  const [numberInputSeconds, setNumberInputSeconds] = useState(DEFAULT_SECONDS);

  useEffect(() => {
    if (hasBegunWriting) {
      timer.start();
    }
  }, [hasBegunWriting]);
  useEffect(() => {
    if (isNewPage) {
      resetTimer();
    }
  }, [isNewPage]);

  // Edit Timer states end

  // Countdown Timer functions begin
  function startTimer() {
    if (timer.isPaused()) {
      timer.resume();
    } else {
      timer.start();
    }
  }

  function pauseTimer() {
    timer.pause();
    setHasBegunWriting(false);
  }

  function resetTimer() {
    timer.stop();
    setTimeLeftPercentage(99);
    setRemainingTime(targetTimeInMilli + MILLISECONDS_CONVERSION_BUFFER);
    setHasBegunWriting(false);
  }
  // Countdown Timer functions end

  // Edit Timer functions begin
  function handleSaveClick() {
    setTargetTimeInMilli(
      numberInputHours * 3600000 +
        numberInputMinutes * 60000 +
        numberInputSeconds * 1000
    );
    resetTimer();
  }
  // Edit Timer functions end

  return (
    <Popover.Root modal={true}>
      <Popover.Anchor>
        <article className="rounded-md border py-3 px-6 text-dark-tint shadow-md shadow-dark-tint">
          <Popover.Trigger asChild>
            <section
              className="daisy-radial-progress mb-2 text-xl font-bold  hover:cursor-pointer"
              style={{
                "--value": `${percentageLeft}`,
                "--size": "8rem",
                "--thickness": "0.5rem",
              }}
            >
              {printTimeInHumanReadableFormat(remainingTime)}
            </section>
          </Popover.Trigger>
          <section className="flex justify-center gap-2">
            {timer.isStopped() || timer.isPaused() ? (
              <button
                onClick={() => {
                  startTimer();
                }}
              >
                <Play
                  className="rounded-full border p-1"
                  weight="fill"
                  size={32}
                />
              </button>
            ) : (
              <button onClick={pauseTimer}>
                <Pause
                  className="rounded-full border p-1"
                  weight="fill"
                  size={32}
                />
              </button>
            )}

            <button onClick={resetTimer}>
              <ArrowCounterClockwise
                className="rounded-full border p-1"
                weight="fill"
                size={32}
              />
            </button>
          </section>
        </article>
      </Popover.Anchor>

      <Popover.Portal>
        <Popover.Content
          collisionPadding={10}
          className="rounded-md bg-light-shade shadow-md shadow-dark-base"
        >
          <fieldset className="flex">
            <NumberInput
              value={numberInputHours}
              max={99}
              min={0}
              setValue={setNumberInputHours}
              handleChange={setNumberInputHours}
            />
            <NumberInput
              value={numberInputMinutes}
              max={59}
              min={0}
              setValue={setNumberInputMinutes}
              handleChange={setNumberInputMinutes}
            />
            <NumberInput
              value={numberInputSeconds}
              max={59}
              min={0}
              setValue={setNumberInputSeconds}
              handleSecondsChange={setNumberInputSeconds}
            />
          </fieldset>
          <div className="flex justify-center gap-4 p-4">
            <Popover.Close asChild>
              <button
                onClick={handleSaveClick}
                className="flex grow justify-center gap-1 rounded-md border border-dark-base bg-dark-base py-1 px-3 text-light-shade"
              >
                <FloppyDisk size={24} />
                <span>Save</span>
              </button>
            </Popover.Close>
            <Popover.Close asChild>
              <button className="flex grow justify-center gap-1 rounded-md border py-1 px-3">
                <X size={24} />
                <span>Cancel</span>
              </button>
            </Popover.Close>
          </div>
          <Popover.Arrow width={20} height={10} />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};
