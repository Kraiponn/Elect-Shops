import React from "react";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";

// Material components
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

// Colors system
import {
  clDarkLight,
  clDarkMedium,
  clPrimaryDark,
  clSecondary,
  clWhite,
  clWhiteGray,
} from "@/features/const/colors";

// Global state and Types
import { useAppSelector } from "@/features/hooks/use-global-state";

interface IProps {}

/***********************************************************************************
 *                          ---  MAIN FUNCTION   ---                               *
 **********************************************************************************/
export default function TopNavigation({}: IProps) {
  const { darkMode } = useAppSelector((state) => state.gui);
  const { t } = useTranslation("checkout");
  const router = useRouter();

  const onBackToOldPage = () => {
    router.back();
  };

  return (
    <AppBar
      sx={{
        background: darkMode ? clDarkMedium : clWhite,
        color: darkMode ? clWhiteGray : clDarkLight,
      }}
    >
      <Toolbar>
        <IconButton>
          <HomeIcon fontSize="large" color="inherit" />
        </IconButton>

        <Box sx={{ flexGrow: 1 }} />

        <Typography
          variant="h5"
          component="h5"
          onClick={onBackToOldPage}
          sx={{
            color: clPrimaryDark,
            "&:hover": {
              cursor: "pointer",
              color: clSecondary,
              transform: "scaleY(1.1)",
            },
          }}
        >
          {t("cancel")}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
