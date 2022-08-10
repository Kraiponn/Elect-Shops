import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import {
  clBgLight,
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
        default: darkMode ? clDarkHard : clBgLight,
        paper: darkMode ? clDarkHard : clBgLight,
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
        fontSize: "2rem",
        fontWeight: 700,
      },
      h2: {
        fontSize: "1.75rem",
        fontWeight: 700,
      },
      h3: {
        fontSize: "1.55rem",
        fontWeight: 500,
      },
      h4: {
        fontSize: "1.35rem",
        fontWeight: 500,
      },
      h5: {
        fontSize: "1.2rem",
        fontWeight: 700,
      },
      h6: {
        fontSize: "1rem",
        fontWeight: 700,
      },
      subtitle1: {
        fontSize: "1.2rem",
        fontWeight: 500,
      },
      subtitle2: {
        fontSize: "1rem",
        fontWeight: 400,
        opacity: 0.89,
      },
      body1: {
        fontWeight: 400,
        fontSize: "1rem",
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
          // /
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
