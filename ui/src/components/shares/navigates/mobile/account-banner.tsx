import React from "react";
import Image from "next/image";

// Material design
import { Box, Typography } from "@mui/material";

// Components
import defaultProfileImage from "@/assets/images/little-pug-dog.webp";
import styled from "@/assets/styles/AccountMenu.module.css";
import { clPrimaryDark } from "@/features/const/colors";

interface IProps {
  userName?: string;
  email?: string;
  imageUrl?: string;
}

/***********************************************
 *                MAIN METHOD                  *
 **********************************************/
const AccountBanner = ({userName, email, imageUrl}: IProps) => {
  return (
    <Box
      sx={{
        width: "100%",
        background: `${clPrimaryDark}`,
        p: 1,
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "5rem",
          height: "5rem",
          borderRadius: "50%",
          textAlign: "center",
          margin: "1rem auto",
        }}
        component="div"
      >
        <Image
          className={styled["account-logo"]}
          src={imageUrl ? imageUrl : defaultProfileImage}
          alt="image profile"
          layout="fill"
          objectFit="fill"
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
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
      </Box>
    </Box>
  )
}

export default AccountBanner