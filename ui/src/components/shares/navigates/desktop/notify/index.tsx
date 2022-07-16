import React from "react";

import { Badge, IconButton } from "@mui/material";

// Icons
import NotificationsIcon from "@mui/icons-material/Notifications";

import { clSecondary } from "@/features/const/colors";

interface IProps {}

/***********************************************
 *                MAIN METHOD                  *
 **********************************************/
const NotificationMenu = ({}: IProps) => {
  return (
    <IconButton
      color="inherit"
      sx={{
        position: "relative",
        display: "inline-block",
        mx: 1,
      }}
    >
      <Badge
        badgeContent={0}
        sx={{
          "& .MuiBadge-badge": {
            color: "white",
            backgroundColor: clSecondary,
          },
        }}
      >
        <NotificationsIcon color="inherit" />
      </Badge>
    </IconButton>
  );
};

export default NotificationMenu;
