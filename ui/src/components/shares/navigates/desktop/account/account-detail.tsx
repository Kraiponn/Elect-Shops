import React from "react";
import Image from "next/image";

// Material design
import { Box, Typography } from "@mui/material";

import defaultProfileImage from "@/assets/images/little-pug-dog.webp";
import styled from "@/assets/styles/AccountMenu.module.css";

interface Props {
  user_name?: string;
  email?: string;
  image_url?: string;
}

/***********************************************
 *                MAIN METHOD                  *
 **********************************************/
const AccountDetail = ({ user_name, email, image_url }: Props) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <Box
        component="div"
        sx={{
          position: "relative",
          width: "2.5rem",
          height: "2.5rem",
          marginRight: "0.55rem",
        }}
      >
        <Image
          className={styled["account-logo"]}
          src={image_url ? image_url : defaultProfileImage}
          alt="image profile"
          layout="fill"
          objectFit="fill"
        />
      </Box>
      <div>
        <Typography
          sx={{
            fontSize: "1rem",
          }}
          variant="subtitle1"
        >
          {user_name ? user_name : ""}
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
      </div>
    </Box>
  );
};

export default AccountDetail;
