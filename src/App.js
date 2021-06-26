import Alert from "@material-ui/lab/Alert";
import Box from "@material-ui/core/Box";
import Chip from "@material-ui/core/Chip";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Paper from "@material-ui/core/Paper";
import Snackbar from "@material-ui/core/Snackbar";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { useState } from "react";

const Section = ({ section }) => {
  const [title, cards] = section;

  return (
    <Paper elevation={16}>
      <Box p={2} mt={2}>
        <Typography variant="h6">
          {title}
          <Box ml={1} clone>
            <Chip label={`${cards.length} cards`} />
          </Box>
        </Typography>
        {cards.map((card) => (
          <SectionItem author={card.author} content={card.content} />
        ))}
      </Box>
    </Paper>
  );
};

const SectionItem = ({ author, content }) => {
  return (
    <List dense>
      <ListItem disableGutters>
        <ListItemText
          primary={content}
          secondary={
            <Typography component="span" variant="body2" color="textSecondary">
              {author.name}
            </Typography>
          }
        />
      </ListItem>
    </List>
  );
};

export default function App() {
  const [textareaContent, setTextareaContent] = useState(null);
  const [snackbarState, setSnackbarState] = useState({
    open: false,
    message: "",
    severity: "danger"
  });

  const renderSection = (section) => {
    const [, cards] = section;

    if (cards.length) return <Section section={section} />;

    return null;
  };

  const handleSnackbarClose = () => {
    setSnackbarState({
      ...snackbarState,
      open: false
    });
  };

  const handleTextareaChange = (e) => {
    try {
      const parsedTextarea = JSON.parse(e.target.value);
      setTextareaContent(parsedTextarea);
      setSnackbarState({
        ...snackbarState,
        open: true,
        message: "JSON parsed",
        severity: "success"
      });
    } catch (e) {
      setSnackbarState({
        ...snackbarState,
        open: true,
        message: e.message,
        severity: "error"
      });
    }
  };

  return (
    <div className="App">
      <TextField
        fullWidth
        id="metroretro-json"
        inputProps={{
          style: {
            fontSize: 12,
            fontFamily: ["Consolas", "Monaco", '"Lucida Console"'].join(",")
          }
        }}
        label="Metroretro JSON"
        multiline
        onChange={handleTextareaChange}
        rows={15}
        variant="filled"
      />
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        autoHideDuration={5000}
        key={`snackbar-${snackbarState.severity}`}
        onClose={handleSnackbarClose}
        open={snackbarState.open}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarState.severity}
          variant="filled"
        >
          {snackbarState.message}
        </Alert>
      </Snackbar>

      {textareaContent &&
        Object.entries(textareaContent).map((section) =>
          renderSection(section)
        )}
    </div>
  );
}
