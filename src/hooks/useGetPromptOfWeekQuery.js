import { useQuery } from "@tanstack/react-query";
import getTopPromptFromJSON from "./util/getTopPromptFromJSON";

async function fetchWeeklyTopPost() {
  const response = await fetch(
    "https://www.reddit.com/r/WritingPrompts/top/.json?t=week"
  );

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }

  const posts = await response.json();
  const topPost = getTopPromptFromJSON(posts);

  return topPost;
}

export default () => {
  return useQuery(["Get the top post of the month"], fetchWeeklyTopPost);
};
