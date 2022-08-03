import React from "react";
import Image from "next/image";

// Material design
import { Avatar, Box, Typography } from "@mui/material";

import defaultProfileImage from "@/assets/images/little-pug-dog.webp";
import styled from "@/assets/styles/AccountMenu.module.css";

interface Props {
  user_name?: string;
  email?: string;
  image_url?: string;
}

/***********************************************************************************
 *                          ---   MAIN FUNCTION   ---                              *
 **********************************************************************************/
const AccountDetail = ({ user_name, email, image_url }: Props) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        padding: "0.5rem",
      }}
    >
      <Avatar
        sx={{
          position: "relative",
          width: "3.89rem",
          height: "3.89rem",
          marginRight: "0.55rem",
        }}
      >
        <Image
          // className={styled["account-logo"]}
          src={image_url ? image_url : defaultProfileImage}
          alt="profile image"
          layout="fill"
          objectFit="fill"
        />
      </Avatar>
      <div>
        <Typography variant="h5">{user_name ? user_name : ""}</Typography>

        <Typography variant="body2" sx={{ mt: "5px" }}>
          {email ? email : ""}
        </Typography>
      </div>
    </Box>
  );
};

export default AccountDetail;
