import React from "react";
import Image from "next/image";

// Material design
import { Avatar, Box, Typography } from "@mui/material";

// Components
import defaultProfileImage from "@/assets/images/little-pug-dog.webp";
import styled from "@/assets/styles/AccountMenu.module.css";
import { clPrimaryDark } from "@/features/const/colors";

interface IProps {
  userName?: string;
  email?: string;
  imageUrl?: string;
}

/***********************************************************************************
 *                                MAIN FUNCTION                                    *
 **********************************************************************************/
const AccountBanner = ({ userName, email, imageUrl }: IProps) => {
  return (
    <Box
      sx={{
        width: "100%",
        background: `${clPrimaryDark}`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        color: "inherit",
        py: 3,
      }}
    >
      <Avatar
        sx={{
          position: "relative",
          width: "7rem",
          height: "7rem",
        }}
      >
        <Image
          // className={styled["account-logo"]}
          src={imageUrl ? imageUrl : defaultProfileImage}
          alt="image profile"
          layout="fill"
          objectFit="fill"
        />
      </Avatar>

      <Typography
        sx={{
          fontFamily: "Prompt",
          fontSize: "1.2rem",
          fontWeight: 700,
          color: "rgb(255, 251, 4)",
          mt: 2,
        }}
      >
        {userName ? userName : "Welcome Back"}
      </Typography>

      <Typography
        sx={{
          fontFamily: "Prompt",
          fontSize: "1rem",
          fontWeight: 500,
          fontStyle: "italic",
          color: "rgba(255, 251, 4, 0.901)",
        }}
      >
        {email ? email : ""}
      </Typography>

      {/* <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          mt: 2,
        }}
      >
        <Typography
          sx={{
            fontSize: "1rem",
          }}
          variant="subtitle1"
        >
          {userName ? userName : "Welcome Back"}
        </Typography>
        <Typography
          sx={{
            fontWeight: "100",
            fontFamily: "PromptThin",
            fontSize: "0.89rem",
          }}
        >
          {email ? email : ""}
        </Typography>
      </Box> */}
    </Box>
  );
};

export default AccountBanner;
