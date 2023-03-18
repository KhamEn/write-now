import useGetPromptOfWeekQuery from "../../hooks/useGetPromptOfWeekQuery";

export default () => {
  const prompt = useGetPromptOfWeekQuery();

  return <p className="prose-xl prose font-serif">{prompt.data}</p>;
};
