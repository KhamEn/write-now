import useGetPromptOfYearQuery from "../../hooks/useGetPromptOfYearQuery";

export default () => {
  const prompt = useGetPromptOfYearQuery();

  return <p className="prose-xl prose font-serif font-bold">{prompt.data}</p>;
};
