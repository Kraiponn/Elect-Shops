import React, { ChangeEvent, useState } from "react";
import Image from "next/image";

// Material Design
import { Avatar, Box, Button, Grid, Typography } from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

// Color system
import { clDarkLight, clDarkMedium, clGray100 } from "@/features/const/colors";

// Components
import ProfileImage from "@/assets/images/little-pug-dog.webp";
import AccountForm from "@/components/dashboard/content/profile/account-form";
import ChangePasswordForm from "@/components/dashboard/content/profile/change-password-form";
import LoginHistory from "@/components/dashboard/content/profile/login-history";

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
