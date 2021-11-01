import { createContext } from "react";

export const defaultValue = {
  message: null,
  open: false,
  severity: null,
  showErrorAlert: () => {},
  showSuccessAlert: () => {}
};

const SnackbarContext = createContext(defaultValue);

export default SnackbarContext;
