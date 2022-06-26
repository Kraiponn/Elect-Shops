import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import { clPrimary, clSecondary } from "../const/colors";

// Create a theme instance.
const theme = createTheme({
  palette: {
    mode: "light",
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
    // fontSize: 16,
    h1: {
      fontSize: "3.5rem",
    },
    h2: {
      fontSize: "2.5rem",
    },
    h3: {
      fontSize: "2rem",
    },
    h4: {
      fontSize: "1.75rem",
    },
    h5: {
      fontSize: "1.25rem",
    },
    h6: {
      fontSize: "0.85rem",
    },
  },
  components: {
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
      },
    },
  },
});

export default theme;
