import useGetPromptOfDayQuery from "../../hooks/useGetPromptOfDayQuery";

export default () => {
  const dayPrompt = useGetPromptOfDayQuery();

  return <p className="prose-xl prose font-serif">{dayPrompt.data}</p>;
};
