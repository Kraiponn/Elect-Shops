import React from "react";
import Image from "next/image";

// Material Design
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";

import MenuIcon from "@mui/icons-material/Menu";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ProfileImage from "@/assets/images/little-pug-dog.webp";

/*******************************************************************************
 *                           Constant and Types                                *
 ******************************************************************************/
import { DRAWER_WIDTH } from "@/components/dashboard/utils/constants";
import { useAppSelector } from "@/features/hooks/use-global-state";

interface IProps {
  open: boolean;
  handleDrawerOpen: () => void;
}

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    marginLeft: `${DRAWER_WIDTH}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

/***********************************************************************************
 *                          ---   MAIN FUNCTION   ---                              *
 **********************************************************************************/
export default function TopNavigation({ open, handleDrawerOpen }: IProps) {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <AppBar
      position="fixed"
      open={open}
      sx={{ background: "rgb(255, 255, 255)" }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{ mr: 2, ...(open && { display: "none" }) }}
        >
          <MenuIcon sx={{ color: "rgb(0, 0, 0)", fontSize: "2rem" }} />
        </IconButton>
        <Typography
          variant="h4"
          noWrap
          component="div"
          sx={{
            color: "rgb(250, 250, 7)",
            textShadow: "0.2rem 0.2rem 0.2rem rgb(1,1,1)",
          }}
        >
          Dashboard
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        <IconButton sx={{ position: "relative" }}>
          <Avatar
            sx={{
              position: "relative",
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              "&:hover": {
                cursor: "pointer",
              },
            }}
          >
            <Image
              src={user?.image_url ? user.image_url : ProfileImage}
              alt="profile image"
              layout="fill"
              objectFit="contain"
            />
          </Avatar>

          <Box
            sx={{
              position: "absolute",
              right: "10%",
              top: "115%",
              zIndex: 2,
              width: "12rem",
              minHeight: "10rem",
              background: "rgb(255, 255, 255)",
              boxShadow: "0 0 0.5rem rgba(5, 105, 254, 0.585)",
              padding: "1rem 0.5rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
            }}
          >
            <Divider sx={{my: 1,}} />
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                "&:hover": {
                  color: "red",
                },
              }}
            >
              <ExitToAppIcon sx={{ fontSize: "1.5rem" }} />
              <Typography
                sx={{
                  fontSize: "1.2rem",
                  fontWeight: 700,
                  ml: 1,
                }}
              >{`LogOut`}</Typography>
            </Box>
          </Box>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
