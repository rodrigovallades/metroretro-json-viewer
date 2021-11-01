import Box from '@material-ui/core/Box';
import ReactWordcloud from 'react-wordcloud';

import React from 'react';

const options = {
  deterministic: true,
  enableTooltip: false,
  fontFamily: 'impact',
  fontSizes: [12, 80],
  padding: 5,
  rotations: 0,
  transitionDuration: 1000
};

const extractWords = (content) => {
  const wordHashMap = {};

  content.forEach((content) => {
    const words = content.split(' ');

    words.forEach((word) => {
      const parsedWord = word.toLowerCase();

      if (parsedWord.length < 2) return;

      if (wordHashMap[parsedWord]) {
        wordHashMap[parsedWord]++;
      } else {
        wordHashMap[parsedWord] = 1;
      }
    });
  });

  return wordHashMap;
};

const sortWords = (words) => Object.entries(words).sort((a, b) => a[1] - b[1]);

const formatWords = (words) =>
  words.map(([text, value]) => ({
    text,
    value
  }));

const WordCloud = ({ cards }) => {
  const allContent = cards.map(({ content }) => content);
  const words = extractWords(allContent);
  const sortedWords = sortWords(words);
  const formattedWords = formatWords(sortedWords);

  return (
    <Box>
      <ReactWordcloud maxWords={50} options={options} words={formattedWords} />
    </Box>
  );
};

export default WordCloud;
