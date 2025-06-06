export const useEmbeds = () => {
  return {
    processEmbed: (content: string) => content,
    isLoading: false,
  };
}; 