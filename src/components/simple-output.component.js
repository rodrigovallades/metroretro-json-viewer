import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import React from 'react';

const SimpleOutput = ({ section }) => {
  const [title, cards] = section;

  return (
    <Box mb={4}>
      <Typography variant="body1" component="h3">
        {title} ({cards.length})
      </Typography>
      <ul>
        {cards.map(({ author, content, date }) => (
          <li key={date}>
            {content} ({author.name})
          </li>
        ))}
      </ul>
    </Box>
  );
};

export default SimpleOutput;
