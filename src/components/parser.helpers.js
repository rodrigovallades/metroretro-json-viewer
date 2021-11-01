export const validateSection = (section) => {
  const [, cards] = section;

  return cards !== undefined && Array.isArray(cards);
};
