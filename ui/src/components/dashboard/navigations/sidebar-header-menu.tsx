import React from "react";
import Image from "next/image";

// Material Design
import { Avatar, Box, Typography } from "@mui/material";

// Colors System
import { clDarkMedium, clGray100 } from "@/features/const/colors";

// Components
import ProfileImage from "@/assets/images/little-pug-dog.webp";

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
          // minHeight: "13rem",
          paddingY: "1.5rem",
          background: clDarkMedium,
          color: clGray100,
          border: "none",
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

      {/***********  Divider - Sidebar Header Profile   ************/}
      <Box
        sx={{
          width: "80%",
          height: "0.01rem",
          margin: "0 auto",
          background: "rgba(255, 255, 255, 0.2)",
        }}
      />
    </>
  );
}
