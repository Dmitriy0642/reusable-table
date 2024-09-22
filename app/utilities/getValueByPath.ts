export const getValueByPath = (obj: Record<string, any>, path: string): any => {
  return path.split(".").reduce((acc, key) => {
    return acc && typeof acc === "object" && key in acc ? acc[key] : undefined;
  }, obj);
};
