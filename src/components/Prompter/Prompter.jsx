import { useState } from "react";
import PromptOfTheDay from "./PromptOfTheDay";
import PromptOfTheMonth from "./PromptOfTheMonth";
import PromptOfTheWeek from "./PromptOfTheWeek";

export default () => {
  const [dayAnchorText, setDayAnchorText] = useState("prompt of the day");
  const [weekAnchorText, setWeekAnchorText] = useState("week");
  const [monthAnchorText, setMonthAnchorText] = useState("month");
  const [isDayActive, setIsDayActive] = useState(true);
  const [isWeekActive, setIsWeekActive] = useState(false);
  const [isMonthActive, setIsMonthActive] = useState(false);
  const [prompt, setPrompt] = useState(<PromptOfTheDay />);

  function changePrompt(activePrompt) {
    if (activePrompt === "day") {
      setIsDayActive(true);
      setIsWeekActive(false);
      setIsMonthActive(false);
      setPrompt(<PromptOfTheDay />);
      setDayAnchorText("prompt of the day");
      setWeekAnchorText("week");
      setMonthAnchorText("month");
    } else if (activePrompt === "week") {
      setIsDayActive(false);
      setIsWeekActive(true);
      setIsMonthActive(false);
      setPrompt(<PromptOfTheWeek />);
      setDayAnchorText("day");
      setWeekAnchorText("prompt of the week");
      setMonthAnchorText("month");
    } else if (activePrompt === "month") {
      setIsDayActive(false);
      setIsWeekActive(false);
      setIsMonthActive(true);
      setPrompt(<PromptOfTheMonth />);
      setDayAnchorText("day");
      setWeekAnchorText("week");
      setMonthAnchorText("prompt of the month");
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
          {dayAnchorText}
        </a>
        <a
          onClick={() => {
            changePrompt("week");
          }}
          className={`tab tab-lifted${isWeekActive ? " tab-active" : ""}`}
        >
          {weekAnchorText}
        </a>
        <a
          onClick={() => {
            changePrompt("month");
          }}
          className={`tab tab-lifted${isMonthActive ? " tab-active" : ""}`}
        >
          {monthAnchorText}
        </a>
      </div>
      <div className="card bg-base-200 shadow-lg shadow-base-300">
        <div className="card-body">{prompt}</div>
      </div>
    </>
  );
};
