export default ({ prompt, redditThreadUrl }) => {
  return (
    <div className="rounded-lg border border-neutral-lighter p-4 shadow-plane-bl shadow-neutral-lighter">
      <div>
        <p className="">{prompt}</p>
      </div>

      <div className="mt-4">
        <a
          href={redditThreadUrl}
          target="_blank"
          className="rounded-full border px-2 text-sm text-secondary-base hover:underline"
        >
          reddit thread
        </a>
      </div>
    </div>
  );
};
