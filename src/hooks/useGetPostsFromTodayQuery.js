import { useQuery } from "@tanstack/react-query";

async function fetchPostsFromToday() {
  const response = await fetch(
    "https://www.reddit.com/r/WritingPrompts/top/.json"
  );

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }

  return await response.json();
}

export default () => {
  return useQuery(["Get top posts from today"], fetchPostsFromToday);
};
