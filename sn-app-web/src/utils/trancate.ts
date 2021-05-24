export const truncate = (value: string, limit: number = 50) => {
  if (value.length < limit) {
    return value;
  }
  return `${value.slice(0, limit)}...`;
};
