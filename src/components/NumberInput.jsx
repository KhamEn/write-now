import { CaretUp, CaretDown } from "@phosphor-icons/react";

// const twoMinmumDigitsFormatter = new Intl.NumberFormat("en-US", {
//   minimumIntegerDigits: 2,
// });

export default ({ min, max, value, setValue, inputSize = 2 }) => {
  function increment() {
    if (value < max) {
      setValue((value) => parseInt(value) + 1);
    } else {
      setValue(min);
    }
  }

  function decrement() {
    if (value > min) {
      setValue((value) => parseInt(value) - 1);
    } else {
      setValue(max);
    }
  }

  function handleKeyDown(event) {
    if (event.key === "ArrowUp") {
      increment();
    } else if (event.key === "ArrowDown") {
      decrement();
    }
  }

  function handleChange(e) {
    const newValue = e.target.value;
    if (isNaN(newValue)) {
      return;
    }

    if (newValue > max) {
      setValue(max);
    } else if (newValue < min) {
      setValue(min);
    } else {
      setValue(newValue);
    }
  }

  return (
    <div className="mx-auto flex flex-col items-center">
      <button
        onClick={() => increment()}
        className="rounded-full border border-dark-large-AA"
      >
        <CaretUp size={32} />
      </button>
      <input
        className=" my-2 rounded-full bg-light-base text-center text-3xl font-bold"
        value={value}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        min={min}
        max={max}
        size={inputSize}
      />

      <button
        onClick={() => decrement()}
        className="rounded-full border border-dark-large-AA"
      >
        <CaretDown size={32} />
      </button>
    </div>
  );
};
