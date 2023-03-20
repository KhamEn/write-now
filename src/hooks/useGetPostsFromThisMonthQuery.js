import { useQuery } from "@tanstack/react-query";

async function fetchPostsFromThisMonth() {
  const response = await fetch(
    "https://www.reddit.com/r/WritingPrompts/top/.json?t=month&limit=70"
  );

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }

  return await response.json();
}

export default () => {
  return useQuery(["Get top posts from this month"], fetchPostsFromThisMonth);
};
