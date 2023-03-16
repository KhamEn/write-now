import { useState } from "react";
import PromptOfTheDay from "./PromptOfTheDay";
import PromptOfTheWeek from "./PromptOfTheWeek";

export default () => {
  const [isDayActive, setIsDayActive] = useState(true);
  const [isMonthActive, setIsMonthActive] = useState(false);

  function changePrompt(activePrompt) {
    if (activePrompt === "day") {
      setIsDayActive(true);
      setIsMonthActive(false);
    } else if (activePrompt === "month") {
      setIsDayActive(false);
      setIsMonthActive(true);
    }
  }

  return (
    <>
      <div className="tabs flex justify-center">
        <a
          onClick={() => {
            changePrompt("day");
          }}
          className={`tab tab-lifted${isDayActive ? " tab-active" : ""}`}
        >
          prompt of the day
        </a>
        <a
          onClick={() => {
            changePrompt("month");
          }}
          className={`tab tab-lifted${isMonthActive ? " tab-active" : ""}`}
        >
          prompt of the week
        </a>
      </div>
      <div className="card bg-base-200 shadow-lg shadow-base-300">
        <div className="card-body">
          {isDayActive ? <PromptOfTheDay /> : <PromptOfTheWeek />}
        </div>
      </div>
    </>
  );
};
