export const getSectionsFromParsed = (parsedJson) => Object.entries(parsedJson);

export const validateSection = (section) => {
  const [, cards] = section;

  return cards !== undefined && Array.isArray(cards);
};

export const generateExportText = (parsedJson) => {
  let formattedExport = [];
  const sections = getSectionsFromParsed(parsedJson);

  sections.map((section) => {
    const [title, cards] = section;
    formattedExport.push(title);
    formattedExport.push('');

    cards.forEach(({ author, content }) => {
      const line = `- ${content} (${author.name})`;

      formattedExport.push(line);
    });

    return formattedExport.push('');
  });

  return formattedExport;
};

export const getAllCards = (parsedJson) => {
  const sections = getSectionsFromParsed(parsedJson);
  const allCards = [].concat(
    ...sections.map((section) => {
      const [, cards] = section;

      return cards;
    })
  );

  return allCards;
};
