import { useState } from "react";
import PromptOfTheDay from "./PromptOfTheDay";
import PromptOfTheMonth from "./PromptOfTheMonth";
import PromptOfTheWeek from "./PromptOfTheWeek";
import PromptOfTheYear from "./PromptOfTheYear";

export default () => {
  const [dayAnchorText, setDayAnchorText] = useState("prompt of the day");
  const [weekAnchorText, setWeekAnchorText] = useState("week");
  const [monthAnchorText, setMonthAnchorText] = useState("month");
  const [yearAnchorText, setYearAnchorText] = useState("year");

  const [isDayActive, setIsDayActive] = useState(true);
  const [isWeekActive, setIsWeekActive] = useState(false);
  const [isMonthActive, setIsMonthActive] = useState(false);
  const [isYearActive, setIsYearActive] = useState(false);

  const [prompt, setPrompt] = useState(<PromptOfTheDay />);

  function changePrompt(activePrompt) {
    if (activePrompt === "day") {
      setIsDayActive(true);
      setIsWeekActive(false);
      setIsMonthActive(false);
      setIsYearActive(false);

      setDayAnchorText("prompt of the day");
      setWeekAnchorText("week");
      setMonthAnchorText("month");
      setYearAnchorText("year");

      setPrompt(<PromptOfTheDay />);
    } else if (activePrompt === "week") {
      setIsDayActive(false);
      setIsWeekActive(true);
      setIsMonthActive(false);
      setIsYearActive(false);

      setDayAnchorText("day");
      setWeekAnchorText("prompt of the week");
      setMonthAnchorText("month");
      setYearAnchorText("year");

      setPrompt(<PromptOfTheWeek />);
    } else if (activePrompt === "month") {
      setIsDayActive(false);
      setIsWeekActive(false);
      setIsMonthActive(true);
      setIsYearActive(false);

      setDayAnchorText("day");
      setWeekAnchorText("week");
      setMonthAnchorText("prompt of the month");
      setYearAnchorText("year");

      setPrompt(<PromptOfTheMonth />);
    } else if (activePrompt === "year") {
      setIsDayActive(false);
      setIsWeekActive(false);
      setIsMonthActive(false);
      setIsYearActive(true);

      setDayAnchorText("day");
      setWeekAnchorText("week");
      setMonthAnchorText("month");
      setYearAnchorText("prompt of the year");

      setPrompt(<PromptOfTheYear />);
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
        <a
          onClick={() => {
            changePrompt("year");
          }}
          className={`tab tab-lifted${isYearActive ? " tab-active" : ""}`}
        >
          {yearAnchorText}
        </a>
      </div>
      <div className="card bg-base-200 shadow-lg shadow-base-300">
        <div className="card-body">{prompt}</div>
      </div>
    </>
  );
};
