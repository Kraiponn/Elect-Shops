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
    // fontSize: "1rem",
    h1: {
      fontFamily: "PromptBold",
      fontSize: "3.5rem",
    },
    h2: {
      fontFamily: "PromptBold",
      fontSize: "2.5rem",
      // fontWeight: 700,
    },
    h3: {
      fontFamily: "PromptBold",
      fontSize: "2rem",
      // fontWeight: 500,
    },
    h4: {
      fontFamily: "PromptBold",
      fontSize: "1.75rem",
    },
    h5: {
      fontFamily: "PromptBold",
      fontSize: "1.35rem",
    },
    h6: {
      fontFamily: "PromptBold",
      fontSize: "1.2rem",
    },
    subtitle1: {
      fontSize: "1.35rem",
      fontFamily: "PromptMedium",
    },
    subtitle2: {
      fontSize: "1.2rem",
      fontFamily: "PromptMedium",
    },
    body1: {
      fontFamily: "PromptRegular",
      fontSize: "1rem",
    },
    body2: {
      fontFamily: "PromptLight",
      fontSize: "1rem",
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
