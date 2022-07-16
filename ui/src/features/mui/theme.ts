import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import {
  clOrange400,
  clOrange500,
  clOrange700,
  clPrimary,
  clPrimaryDark,
  clPrimaryLight,
  clSecondary,
  clSecondaryDark,
  clWhite,
} from "@/features/const/colors";

// Create a theme instance.
const theme = createTheme({
  palette: {
    // mode: "light",
    primary: {
      main: clPrimary,
      light: clPrimaryLight,
      dark: clPrimaryDark,
    },
    secondary: {
      main: clSecondary,
      dark: clSecondaryDark,
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
      fontWeight: 800,
    },
    h2: {
      fontSize: "2.5rem",
      fontWeight: 700,
    },
    h3: {
      fontSize: "2rem",
      fontWeight: 500,
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
    subtitle1: {
      fontSize: "1.2rem",
      fontWeight: "inherit",
      fontFamily: "Itim",
    },
    subtitle2: {
      fontSize: "0.5rem",
      fontWeight: "inherit",
      fontFamily: "Itim",
    },
    body1: {
      fontSize: "1rem",
      fontWeight: "inherit",
      fontFamily: "PromptMedium",
    },
    body2: {
      fontSize: "0.8rem",
      fontWeight: "inherit",
      fontFamily: "PromptLight",
    },
    button: {
      fontFamily: "PromptRegular",
      textTransform: "capitalize",
    },
    caption: {
      fontFamily: "PromptRegular",
    },
  },
  components: {
    MuiAppBar: {
      defaultProps: {
        elevation: 2,
      },
    },
  },
});

export default theme;
