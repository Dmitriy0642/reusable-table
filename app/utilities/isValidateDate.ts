export const isValidDate = (value: string, key: string): boolean => {
  const date = new Date(value);
  return (
    !isNaN(date.getTime()) &&
    typeof value === "string" &&
    value.includes("T") &&
    value.length >= 10
  );
};
