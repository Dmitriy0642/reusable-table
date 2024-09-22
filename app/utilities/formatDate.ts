export const formatDate = (date: string): string => {
  const parsedDate = new Date(date);
  return parsedDate.toLocaleDateString("en-GB");
};
