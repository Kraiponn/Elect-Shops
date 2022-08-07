import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import {
  clDarkHard,
  clPrimary,
  clPrimaryDark,
  clPrimaryLight,
  clSecondary,
  clSecondaryDark,
  clWhite,
} from "@/features/const/colors";

import { useAppSelector } from "@/features/hooks/use-global-state";

export default function useTheme() {
  const { darkMode } = useAppSelector((state) => state.gui);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
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
      background: {
        default: darkMode ? clDarkHard : clWhite,
        paper: darkMode ? clDarkHard : clWhite,
        // default: clDark,
        // paper: clDark,
      },
      text: {
        // primary: clDark,
      },
    },
    typography: {
      fontFamily: "Prompt",
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
        fontFamily: "Prompt",
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
      MuiOutlinedInput: {
        defaultProps: {
          //
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

  return {
    theme,
  };
}
