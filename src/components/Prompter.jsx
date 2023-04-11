export default ({ prompt, redditThreadUrl }) => {
  return (
    <div className="border border-dark-tint p-4 shadow-plane-bl shadow-dark-tint">
      <div>
        <p className=" font-serif text-lg">{prompt}</p>
      </div>

      <div className="mt-4">
        <a
          href={redditThreadUrl}
          target="_blank"
          className="text-blue-shade rounded-full border px-2 text-sm underline"
        >
          reddit thread
        </a>
      </div>
    </div>
  );
};
