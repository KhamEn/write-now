import useGetPromptOfMonthQuery from "../../hooks/useGetPromptOfMonthQuery";

export default () => {
  const prompt = useGetPromptOfMonthQuery();

  return <p className="prose-xl prose font-serif">{prompt.data}</p>;
};
