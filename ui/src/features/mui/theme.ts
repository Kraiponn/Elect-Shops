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
    fontFamily: "Roboto",
    h1: {
      // fontFamily: "PromptBold",
      fontSize: "3rem",
      fontWeight: 900,
    },
    h2: {
      // fontFamily: "PromptBold",
      fontSize: "2.5rem",
      fontWeight: 900,
    },
    h3: {
      // fontFamily: "PromptBold",
      fontSize: "2rem",
      fontWeight: 900,
    },
    h4: {
      // fontFamily: "PromptBold",
      fontSize: "1.5rem",
      fontWeight: 900,
    },
    h5: {
      // fontFamily: "PromptBold",
      fontSize: "1.2rem",
      fontWeight: 900,
    },
    h6: {
      // fontFamily: "PromptBold",
      fontSize: "1rem",
      fontWeight: 900,
    },
    subtitle1: {
      fontSize: "1.2rem",
      fontWeight: 700,
    },
    subtitle2: {
      fontSize: "1rem",
      fontWeight: 700,
    },
    body1: {
      fontWeight: 300,
      fontSize: "1.2rem",
    },
    body2: {
      fontWeight: 300,
      fontSize: "1rem",
    },
    button: {
      fontFamily: "Itim",
      textTransform: "capitalize",
    },
    caption: {
      fontFamily: "Prompt",
    },
  },
  components: {
    MuiAppBar: {
      defaultProps: {
        elevation: 1,
      },
    },
    MuiTextField: {
      defaultProps: {},
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 500,
      md: 750,
      lg: 950,
      xl: 1536,
    },
  },
});

export default theme;
