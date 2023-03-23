export default ({ prompt, redditThreadUrl }) => {
  return (
    <div className="rounded-lg border border-light-shade p-4 shadow-plane-bl shadow-light-shade">
      <div>
        <p className="">{prompt}</p>
      </div>

      <div className="mt-4">
        <a
          href={redditThreadUrl}
          target="_blank"
          className="rounded-full border px-2 text-sm text-blue-shade hover:underline"
        >
          reddit thread
        </a>
      </div>
    </div>
  );
};
