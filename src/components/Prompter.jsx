import { useEffect, useState } from "react";

export default () => {
  const [prompt, setPrompt] = useState("");

  useEffect(() => {
    async function fetchPosts() {
      const response = await fetch(
        "https://www.reddit.com/r/WritingPrompts/top/.json"
      );

      if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
      }

      const posts = await response.json();
      const firstPost = posts.data.children[0].data.title;

      setPrompt(firstPost.replace(/\[WP\]/g, ""));
    }

    fetchPosts().catch((error) => {
      console.error(error);
      setPrompt(
        "The year is 1910. Adolf Hitler, a struggling artist, has fought off dozens of assasination attemps by well meaning time travelers, but this one is different. This traveller doesn't want to kill Hitler, he wants to teach him to paint. He pulls off his hood to reveal the frizzy afro of Bob Ross."
      );
    });
  }, []);

  return (
    <div className="card bg-base-200 shadow-lg shadow-base-300">
      <div className="card-body">
        <div className="badge-secondary badge-outline badge">
          prompt of the day
        </div>
        <p className="prose-xl prose font-serif font-bold">{prompt}</p>
      </div>
    </div>
  );
};
