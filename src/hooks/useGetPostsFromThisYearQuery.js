import { useQuery } from "@tanstack/react-query";

async function fetchPostsFromThisYear() {
  const response = await fetch(
    "https://www.reddit.com/r/WritingPrompts/top/.json?t=year&limit=100"
  );

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }

  return await response.json();
}

export default () => {
  return useQuery(["Get top posts from this year"], fetchPostsFromThisYear);
};
