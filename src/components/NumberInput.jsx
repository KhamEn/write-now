import { CaretUp, CaretDown } from "@phosphor-icons/react";

// const twoMinmumDigitsFormatter = new Intl.NumberFormat("en-US", {
//   minimumIntegerDigits: 2,
// });

export default ({ min, max, value, setValue }) => {
  function increment() {
    if (value < max) {
      setValue((value) => value + 1);
    } else {
      setValue(min);
    }
  }

  function decrement() {
    if (value > min) {
      setValue((value) => value - 1);
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
    <div className="daisy-stat place-items-center">
      <button onClick={() => increment()}>
        <CaretUp size={32} />
      </button>
      <input
        className="AAA daisy-stat-value my-2 rounded-full bg-light-base text-center"
        value={value}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        min={min}
        max={max}
        size={2}
      />

      <button onClick={() => decrement()}>
        <CaretDown size={32} />
      </button>
    </div>
  );
};
