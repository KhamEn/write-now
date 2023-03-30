export default ({
  handleNewPromptClick,
  handleCopyClick,
  handleExportClick,
}) => {
  return (
    <article className="flex h-fit w-fit gap-4 rounded-full  p-4  ">
      {/* <article className="flex w-fit gap-4 p-4"> */}
      <button
        onClick={handleNewPromptClick}
        className="rounded-2xl border-2 px-3 py-1 text-red-base shadow-block-b hover:bg-red-normal-AAA "
      >
        Get New Prompt
      </button>
      {/* <button
        onClick={handleCopyClick}
        className="rounded-2xl border-2 px-3 py-1 text-dark-base shadow-block-b hover:bg-dark-normal-AAA"
      >
        Copy Response
      </button> */}
      <button className="rounded-2xl border-2 px-3 py-1 text-dark-base shadow-block-b  hover:bg-dark-normal-AAA ">
        <a onClick={(event) => handleExportClick(event.target)}>
          Export Writing
        </a>
      </button>
    </article>
  );
};
