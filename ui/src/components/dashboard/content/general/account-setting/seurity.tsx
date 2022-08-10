import React from "react";

// Material Design
import { Box } from "@mui/material";

// Color system
import { clDarkMedium } from "@/features/const/colors";

// Components
import ChangePasswordForm from "@/components/dashboard/content/general/account-setting/change-password-form";
import LoginHistory from "@/components/dashboard/content/general/account-setting/login-history";

interface IProps {
  darkMode: boolean;
}

/***********************************************************************************
 *                          ---   MAIN FUNCTION   ---                              *
 **********************************************************************************/
export default function Security({ darkMode }: IProps) {
  return (
    <>
      {/******************   Change Password   *******************/}
      <Box
        sx={{
          padding: "2.5rem",
          marginTop: "2rem",
          boxShadow: "0 0 5px rgba(1, 1, 1, 0.114)",
          borderRadius: "0.5rem",
          background: darkMode ? clDarkMedium : "rgb(255, 255, 255)",
        }}
      >
        <ChangePasswordForm darkMode={darkMode} />
      </Box>

      {/******************   Login History   *******************/}
      <Box
        sx={{
          padding: "2.5rem",
          marginTop: "2rem",
          boxShadow: "0 0 5px rgba(1, 1, 1, 0.114)",
          borderRadius: "0.5rem",
          background: darkMode ? clDarkMedium : "rgb(255, 255, 255)",
        }}
      >
        <LoginHistory darkMode={darkMode} />
      </Box>
    </>
  );
}
