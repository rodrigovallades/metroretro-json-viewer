import Box from '@material-ui/core/Box';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import React, { useContext, useEffect, useState } from 'react';

import SnackbarContext from '../snackbar.context';
import BeautifulOutput from './beautiful-output.component';
import WordCloud from './wordcloud.component';
import SimpleOutput from './simple-output.component';
import {
  getAllCards,
  getSectionsFromParsed,
  validateSection
} from './parser.helpers';
import DownloadButton from './download-button.component';
import CopyButton from './copy-button.component';

const Parser = ({ input }) => {
  const [parsingError, setParsingError] = useState(false);
  const [textareaContent, setTextareaContent] = useState(null);
  const [beautifulOutput, setBeautifulOutput] = useState(true);
  const { showErrorAlert, showSuccessAlert } = useContext(SnackbarContext);

  useEffect(
    (_) => {
      if (parsingError) showErrorAlert(`Is this Metro Retro's JSON? 🤔`);
    },
    [parsingError, showErrorAlert]
  );

  const handleTextareaChange = (e) => {
    setParsingError(false);
    try {
      let error;
      const parsedTextarea = JSON.parse(e.target.value);
      const sections = Object.entries(parsedTextarea);
      sections.forEach((section) => {
        if (!validateSection(section)) {
          error = true;
          setParsingError(true);
          setTextareaContent(null);
        }
      });

      if (error) return setParsingError(error);

      setTextareaContent(parsedTextarea);
      showSuccessAlert('JSON parsed');
    } catch (e) {
      setTextareaContent(null);
      showErrorAlert(e.message);
    }
  };

  const handleOutputTypeChange = (event) => {
    setBeautifulOutput(event.target.checked);
  };

  const handleCopy = () => showSuccessAlert('Copied to clipboard');

  const renderOutput = () => {
    if (!textareaContent || parsingError) return null;

    const OutputComponent = beautifulOutput ? BeautifulOutput : SimpleOutput;
    const sections = getSectionsFromParsed(textareaContent);
    const allCards = getAllCards(textareaContent);

    return (
      <Container maxWidth="md">
        <Box mb={2}>
          <WordCloud cards={allCards} />
          <Box mt={2}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs>
                <ButtonGroup
                  disableElevation
                  variant="outlined"
                  color="primary"
                >
                  <DownloadButton content={textareaContent} />
                  <CopyButton content={textareaContent} onCopy={handleCopy} />
                </ButtonGroup>
              </Grid>
              <Grid item>
                <FormControlLabel
                  control={
                    <Switch
                      checked={beautifulOutput}
                      color="primary"
                      inputProps={{ 'aria-label': 'primary checkbox' }}
                      name="simpleOutput"
                      onChange={handleOutputTypeChange}
                    />
                  }
                  label="Beautify output"
                />
              </Grid>
            </Grid>
          </Box>
        </Box>
        {sections.map((section) => {
          const [title] = section;

          return <OutputComponent key={title} section={section} />;
        })}
      </Container>
    );
  };

  return (
    <>
      <Box bgcolor="background.default" py={2}>
        <Container maxWidth="md">
          <Typography gutterBottom variant="h4" component="h1">
            Metro Retro JSON beautifier
          </Typography>
          <TextField
            fullWidth
            helperText="Paste JSON here"
            id="metroretro-json"
            inputProps={{
              style: {
                fontSize: 12,
                fontFamily: ['Consolas', 'Monaco', 'Lucida Console'].join(',')
              }
            }}
            label="Metroretro JSON parser"
            multiline
            onChange={handleTextareaChange}
            rows={10}
            variant="outlined"
          />
        </Container>
      </Box>
      <Divider />
      {renderOutput()}
    </>
  );
};

export default Parser;
