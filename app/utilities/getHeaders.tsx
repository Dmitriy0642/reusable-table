export const getKeys = (obj: Record<string, any>, prefix = ""): string[] => {
  return Object.keys(obj).reduce((keys, key) => {
    const path = prefix ? `${prefix}.${key}` : key;
    if (
      typeof obj[key] === "object" &&
      obj[key] !== null &&
      !Array.isArray(obj[key])
    ) {
      keys.push(...getKeys(obj[key], path));
    } else {
      keys.push(path);
    }
    return keys;
  }, [] as string[]);
};
