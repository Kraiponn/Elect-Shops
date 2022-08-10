import React from "react";
import useTranslation from "next-translate/useTranslation";

// Material Design
import { Box, Typography } from "@mui/material";

// Components
import NotificationSettings from "@/components/dashboard/content/general/notification/list-item";

interface IProps {
  darkMode: boolean;
}

/***********************************************************************************
 *                          ---   MAIN FUNCTION   ---                              *
 **********************************************************************************/
export default function Notification({ darkMode }: IProps) {
  const { t } = useTranslation("dashboard");

  return (
    <Box sx={{ height: "100vh" }}>
      <Typography
        variant="h3"
        sx={{
          my: "2rem",
        }}
      >
        {t("content.generalMenu.notification.title")}
      </Typography>

      <NotificationSettings darkMode={darkMode} />
    </Box>
  );
}
