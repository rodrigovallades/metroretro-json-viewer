import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import React from 'react';

const SECTION_ICONS = {
  'Thumbs Down': '👎',
  'Thumbs Up': '👍',
  Climatempo: '☁️',
  Recognition: '🏆',
  'New Ideas': '💡',
  Actions: '🎬'
};

const Card = ({ author, content }) => {
  return (
    <>
      <ListItem disableGutters>
        <ListItemText primary={`${content}`} secondary={author} />
      </ListItem>
      <Divider />
    </>
  );
};

const BeautifulOutput = ({ section }) => {
  const [title, cards] = section;

  return (
    <Box clone mb={4}>
      <Paper elevation={4}>
        <Box p={2}>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <Typography variant="h5" component="span">
                {SECTION_ICONS[title]}
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography variant="body1" component="h3">
                {title}
              </Typography>
            </Grid>
            <Grid item>
              <Chip variant="outlined" color="primary" label={cards.length} />
            </Grid>
          </Grid>
          <List dense>
            {cards.map(({ author, content, date }) => (
              <Card key={date} author={author.name} content={content} />
            ))}
          </List>
        </Box>
      </Paper>
    </Box>
  );
};

export default BeautifulOutput;
