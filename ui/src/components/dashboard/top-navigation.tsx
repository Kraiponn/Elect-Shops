import React, { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

// Material Design
import {
  Avatar,
  Badge,
  Box,
  Divider,
  IconButton,
  Skeleton,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";

import MenuIcon from "@mui/icons-material/Menu";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import SettingsIcon from "@mui/icons-material/Settings";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import ProfileImage from "@/assets/images/little-pug-dog.webp";

// Components
import ItemMenu from "@/components/dashboard/navigations/item-menu";
import ThemeSwitch from "@/components/dashboard/navigations/theme-switch";

/*******************************************************************************
 *                           Constant and Types                                *
 ******************************************************************************/
import { DRAWER_WIDTH } from "@/components/dashboard/utils/constants";
import { NavMenuType } from "@/components/dashboard/utils/types";
import { IAuthPayload } from "@/features/types";

interface IProps {
  open: boolean;
  user: IAuthPayload | null | undefined;
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
export default function TopNavigation({
  open,
  user,
  handleDrawerOpen,
}: IProps) {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [accountMenu, setAccountMenu] = useState<boolean>(false);

  const handleSelectItem = (item: NavMenuType) => {
    if (item === NavMenuType.PROFILE) {
      //
    } else if (item === NavMenuType.SECURITY) {
      //
    }
  };

  const handleSwitchThemeMode = () => {
    setDarkMode(!darkMode);
  };

  const handleOpenAccountSettingMenu = () => {
    setAccountMenu(!accountMenu);
  };

  return (
    <AppBar
      position="fixed"
      open={open}
      sx={{ background: "rgb(255, 255, 255)" }}
    >
      <Toolbar>
        {/*************   Button Open Navigation Menu - Left Side   **************/}
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

        {/*********************   Theme Switch - Top Navigatoin   *******************/}
        <ThemeSwitch
          darkMode={darkMode}
          handleSwitchThemeMode={handleSwitchThemeMode}
        />

        {/*********************   Notification Menu - Top Navigatoin   *******************/}
        <IconButton sx={{ mr: 2 }}>
          <Badge badgeContent={9} color="secondary">
            <NotificationsActiveIcon fontSize="large" />
          </Badge>
        </IconButton>

        {/*********************   Account Button Menu - Top Navigatoin   *******************/}
        <IconButton
          sx={{
            position: "relative",
            // border: "10px solid red",
            // "&:hover": {
            //   ".account-settings-menu": {
            //     visibility: "visible",
            //     opacity: 1,
            //     transform: "scale(1)",
            //   },
            // },
          }}
          onClick={handleOpenAccountSettingMenu}
        >
          {/*************   Image Button Menu   **************/}
          <Avatar
            sx={{
              position: "relative",
              width: "40px",
              height: "40px",
              "&:hover": {
                cursor: "pointer",
              },
            }}
          >
            <Image
              src={user?.image_url ? user.image_url : ProfileImage}
              alt="Profile picture menu"
              layout="fill"
              objectFit="contain"
            />
          </Avatar>

          {/*************   Sub menu - Show when hover   **************/}
          <Box
            className="account-settings-menu"
            sx={{
              position: "absolute",
              right: "1%",
              top: "100%",
              zIndex: 20000,
              width: "20rem",
              minHeight: "10rem",
              background: "rgb(255, 255, 255)",
              boxShadow: "0px 0px 7px 0 rgba(0, 0, 0, 0.29)",
              borderRadius: "0.5rem",
              padding: "1rem 1rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              visibility: "visible",
              // opacity: 0,
              // transform: "scale(0.5)",
              // transition: "transform .2s ease-out",
              opacity: accountMenu ? 1 : 0,
              transform: accountMenu ? "scale(1)" : "scale(0.5)",
              transition: "transform 0.2s ease-out",
            }}
          >
            {/**************    Account Header Menu   ***************/}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                "&:hover": {
                  cursor: "default",
                },
              }}
            >
              <Avatar
                sx={{ position: "relative", width: "45px", height: "45px" }}
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
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  pl: 1,
                }}
              >
                <Typography variant="h6">
                  {user?.user_name ? user.user_name : ""}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Prompt",
                    fontWeight: 400,
                    fontSize: "1rem",
                    opacity: 0.7,
                  }}
                >
                  {user?.email ? user.email : ""}
                </Typography>
              </Box>
            </Box>
            <Divider sx={{ my: 2 }} />

            {/**************    Profile Menu   ***************/}
            <ItemMenu
              text="Profile"
              menuType="title"
              Icon={ManageAccountsIcon}
              handleSelectItemMenu={handleSelectItem}
              itemSelectType={NavMenuType.PROFILE}
            />

            {/**************    Setting Menu   ***************/}
            <ItemMenu
              text="Setting"
              menuType="title"
              Icon={SettingsIcon}
              handleSelectItemMenu={handleSelectItem}
              itemSelectType={NavMenuType.SETTING}
            />

            {/**************    Analytics Menu   ***************/}
            <ItemMenu
              text="Analytics"
              menuType="title"
              Icon={TrendingUpIcon}
              handleSelectItemMenu={handleSelectItem}
              itemSelectType={NavMenuType.ANALYTIC}
            />

            {/**************    Signout Menu   ***************/}
            <Divider sx={{ mb: 2 }} />
            <ItemMenu
              text="Log Out"
              menuType="title"
              Icon={ExitToAppIcon}
              handleSelectItemMenu={handleSelectItem}
              itemSelectType={NavMenuType.LOGOUT}
            />
          </Box>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
