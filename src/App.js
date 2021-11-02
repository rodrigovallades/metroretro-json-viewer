import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

import React, { useState } from 'react';

import Parser from './components/parser.component';
import SnackbarContext, { defaultValue } from './snackbar.context';

global['metroretro-json-viewer'] = {
  version: process.env.REACT_APP_VERSION
};

export default function App() {
  const [snackbarContext, setSnackbarContext] = useState({
    ...defaultValue,
    showErrorAlert: (message) => {
      setSnackbarContext((state) => ({
        ...state,
        open: true,
        message,
        severity: 'error'
      }));
    },
    showSuccessAlert: (message) => {
      setSnackbarContext((state) => ({
        ...state,
        open: true,
        message,
        severity: 'success'
      }));
    }
  });

  const handleSnackbarClose = (_, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarContext((state) => ({ ...state, open: false }));
  };

  return (
    <>
      <SnackbarContext.Provider value={snackbarContext}>
        <Parser />
      </SnackbarContext.Provider>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        autoHideDuration={4000}
        key={`snackbar-${snackbarContext.severity}`}
        onClose={handleSnackbarClose}
        open={snackbarContext.open}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarContext.severity}
          variant="filled"
        >
          {snackbarContext.message}
        </Alert>
      </Snackbar>
    </>
  );
}
