export const GetChangedFields = (original, current) => {
  return Object.fromEntries(
    Object.entries(current).filter(([key, value]) => value !== original[key])
  );
};
