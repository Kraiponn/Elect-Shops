import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import { clPrimary, clSecondary } from "../const/colors";

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: clPrimary,
    },
    secondary: {
      main: clSecondary,
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    fontFamily: "Itim",
    h1: {
      fontSize: "3.2rem",
    },
    h2: {
      fontSize: "2rem",
    },
    h3: {
      fontSize: "1.5rem",
    },
    h4: {
      fontSize: "1.2rem",
    },
    h5: {
      fontSize: "1rem",
    },
    h6: {
      fontSize: "0.5rem",
    },
  },
});

export default theme;
