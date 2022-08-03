import React, { useState } from "react";
import Image from "next/image";

// Material Design
import { Avatar, Box, Divider, Typography } from "@mui/material";

// Components
import ProfileImage from "@/assets/images/little-pug-dog.webp";

import { clBlueGray900 } from "@/features/const/colors";

interface IProps {
  userName: string;
  imageUrl: string;
}

/***********************************************************************************
 *                          ---   MAIN FUNCTION   ---                              *
 **********************************************************************************/
export default function SidebarHeaderMenu({ userName, imageUrl }: IProps) {
  return (
    <>
      <Box
        sx={{
          width: "100%",
          minHeight: "13rem",
          height: "auto",
          paddingY: "1.5rem",
          background: clBlueGray900,
          color: "rgb(229, 227, 227)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/***********  Profile Image  ************/}
        <Avatar
          sx={{
            position: "relative",
            width: "75px",
            height: "75px",
            background: "rgb(255, 255, 255)",
          }}
        >
          <Image
            src={imageUrl ? imageUrl : ProfileImage}
            alt="Profile image"
            layout="fill"
            objectFit="contain"
          />
        </Avatar>

        <Typography sx={{ mt: "1rem", fontFamily: "Prompt", fontWeight: 500 }}>
          {userName ? userName : ""}
        </Typography>
      </Box>
      <Divider />
    </>
  );
}
