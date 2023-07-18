import * as Popover from "@radix-ui/react-popover";
import { useState, useCallback, useEffect } from "react";
import { useTimer } from "react-use-precision-timer";
import {
  Pause,
  ArrowCounterClockwise,
  FloppyDisk,
  X,
  GearSix,
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

const MILLISECONDS_CONVERSION_BUFFER = 100;

export default ({
  targetTimeInMilli,
  setTargetTimeInMilli,
  hasBegunWriting,
  setHasBegunWriting,
  isNewPage,
}) => {
  // Countdown Timer states begin
  const [remainingTime, setRemainingTime] = useState(
    targetTimeInMilli + MILLISECONDS_CONVERSION_BUFFER
  );
  const [isDone, setIsDone] = useState(false);
  const callback = useCallback(() => {
    const elapsedTime = timer.getElapsedRunningTime();

    setRemainingTime(
      targetTimeInMilli - elapsedTime + MILLISECONDS_CONVERSION_BUFFER
    );

    if (elapsedTime > targetTimeInMilli) {
      setIsDone(true);
      timer.stop();
    }
  }, [targetTimeInMilli]);
  const timer = useTimer({ delay: 1000 }, callback);

  useEffect(
    () => setRemainingTime(targetTimeInMilli + MILLISECONDS_CONVERSION_BUFFER),
    [targetTimeInMilli]
  );
  // Countdown Timer states end

  const [zIndex, setZIndex] = useState("");

  // Edit Timer states begin
  const [numberInputHours, setNumberInputHours] = useState(
    Math.trunc(targetTimeInMilli / 3600000)
  );
  const [numberInputMinutes, setNumberInputMinutes] = useState(
    Math.trunc((targetTimeInMilli % 3600000) / 60000)
  );
  const [numberInputSeconds, setNumberInputSeconds] = useState(
    Math.trunc(((targetTimeInMilli % 3600000) % 60000) / 1000)
  );
  // Edit Timer states end

  // Countdown Timer functions begin
  useEffect(() => {
    if (hasBegunWriting) {
      startTimer();
      // Put the timer above the overlay.
      setZIndex("z-30");

      const delayer = setTimeout(() => {
        // Put the timer under the overlay.
        setZIndex("");
      }, 3000);
      return () => clearTimeout(delayer);
    }
  }, [hasBegunWriting]);

  useEffect(() => {
    // isDone is required because isStopped() doesn't distinguish between not having started vs being stopped
    if (timer.isStopped() && isDone) {
      setIsDone(false);
      setZIndex("z-30");
      const delayer = setTimeout(() => {
        // Put the timer under the overlay.
        setZIndex("");
      }, 3000);
      return () => clearTimeout(delayer);
    }
  }, [timer.isStopped()]);

  useEffect(() => {
    if (isNewPage) {
      resetTimer();
    }
  }, [isNewPage]);

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
    <>
      <Popover.Root modal={true}>
        <Popover.Anchor>
          <article
            className={`relative ${zIndex} rounded-md border py-2 px-4 text-dark-tint shadow-md shadow-dark-tint`}
          >
            <progress
              className="daisy-progress"
              value={timer.getElapsedRunningTime()}
              max={targetTimeInMilli}
            ></progress>

            <section>
              <p className="my-2 font-bold">
                {printTimeInHumanReadableFormat(remainingTime)}
              </p>
              <section className="">
                {timer.isRunning() ? (
                  <>
                    <button onClick={pauseTimer}>
                      <Pause
                        className="mr-1 rounded-full border p-1"
                        weight="fill"
                        size={32}
                      />
                    </button>
                    <button onClick={resetTimer}>
                      <ArrowCounterClockwise
                        className="rounded-full border p-1"
                        weight="fill"
                        size={32}
                      />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={pauseTimer}
                      disabled
                      className=" mr-1 text-light-large-AA hover:cursor-default"
                    >
                      <Pause
                        className="rounded-full border p-1"
                        weight="fill"
                        size={32}
                      />
                    </button>
                    <button onClick={resetTimer}>
                      <ArrowCounterClockwise
                        className="rounded-full border p-1"
                        weight="fill"
                        size={32}
                      />
                    </button>
                  </>
                )}
                <Popover.Trigger asChild className="float-right">
                  <button>
                    <GearSix
                      className="rounded-full py-1"
                      weight="fill"
                      size={32}
                    />
                  </button>
                </Popover.Trigger>
              </section>
            </section>
          </article>
        </Popover.Anchor>

        <Popover.Portal>
          <Popover.Content
            collisionPadding={16}
            className="relative z-50 rounded-md bg-light-shade shadow-md shadow-dark-base"
          >
            <fieldset className="flex">
              <NumberInput
                value={numberInputHours}
                max={99}
                min={0}
                setValue={setNumberInputHours}
              />
              <NumberInput
                value={numberInputMinutes}
                max={59}
                min={0}
                setValue={setNumberInputMinutes}
              />
              <NumberInput
                value={numberInputSeconds}
                max={59}
                min={0}
                setValue={setNumberInputSeconds}
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
    </>
  );
};
