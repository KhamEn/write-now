import { useQuery } from "@tanstack/react-query";

async function getAllPrompts() {
  const response = await fetch(
    "https://wi-api-get-prompts.khamcodes.workers.dev/"
  );

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }

  return await response.json();
}

export default () => {
  return useQuery({
    queryKey: ["Get all prompts in one from KV"],
    queryFn: getAllPrompts,
  });
};
