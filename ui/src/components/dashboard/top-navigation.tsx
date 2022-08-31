import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import useTranslation from "next-translate/useTranslation";

// Material Design
import {
  Avatar,
  Badge,
  Box,
  Divider,
  IconButton,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";

// Material Icons
import MenuIcon from "@mui/icons-material/Menu";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import SettingsIcon from "@mui/icons-material/Settings";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";

// Constant & Types & Global state
import { DRAWER_WIDTH } from "@/components/dashboard/utils/constants";
import { IProfile, NavMenuType } from "@/features/interfaces";
import {
  useAppSelector,
  useAppDispatch,
} from "@/features/hooks/use-global-state";
import { systemLogout } from "@/features/global-state/reducers/auth";
import {
  changeLanguagesMode,
  changeThemeMode,
  toggleOpenAccountMenu,
} from "@/features/global-state/reducers/gui";
import { clDarkMedium, clGray100, clWhite } from "@/features/const/colors";

// Components
import ProfileImage from "@/assets/images/little-pug-dog.webp";
import ItemMenu from "@/components/dashboard/navigations/text-icon-item-menu";
import ThemeItemMenu from "@/components/dashboard/navigations/theme-item-menu";
import LangItemMenu from "@/components/dashboard/navigations/lang-item-menu";

interface IProps {
  open: boolean;
  profile: IProfile | null | undefined;
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
  profile,
  handleDrawerOpen,
}: IProps) {
  const router = useRouter();
  const { t } = useTranslation("dashboard");
  const { currentLocale, darkMode, OpenAccountMenu } = useAppSelector(
    (state) => state.gui
  );
  const dispatch = useAppDispatch();

  const handleSelectItem = (item: NavMenuType) => {
    switch (item) {
      case NavMenuType.PROFILE:
        //
        break;
      case NavMenuType.SETTING:
        //
        break;
      case NavMenuType.ANALYTIC:
        //
        break;
      case NavMenuType.LOGOUT:
        dispatch(systemLogout());
        break;
      default:
    }
  };

  const handleSwitchThemeMode = () => {
    dispatch(changeThemeMode());
  };

  const handleSwitchLanguage = () => {
    dispatch(changeLanguagesMode());
  };

  const handleShowAccountMenu = () => {
    dispatch(toggleOpenAccountMenu());
  };

  useEffect(() => {
    router.push(router.asPath, router.asPath, {
      locale: currentLocale,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLocale]);

  return (
    <AppBar
      position="fixed"
      open={open}
      elevation={0}
      sx={{
        background: darkMode ? clDarkMedium : clWhite,
        boxShadow: "0 0.5px 5px rgba(1, 1, 1, 0.097)",
      }}
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
          <MenuIcon
            sx={{
              color: darkMode ? "rgb(255, 255, 255)" : "rgb(0, 0, 0)",
              fontSize: "2rem",
            }}
          />
        </IconButton>

        <Typography
          noWrap
          component="div"
          sx={{
            color: darkMode ? "rgb(250, 250, 7)" : "rgb(0, 0, 0)",
            textShadow: darkMode
              ? "0.2rem 0.2rem 0.2rem rgb(255, 0, 0)"
              : "0.2rem 0.2rem 0.2rem rgba(85, 85, 83, 0.389)",
            fontFamily: "Prompt",
            fontWeight: 900,
            fontSize: "1.789rem",
          }}
        >
          {t("topNav.title")}
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        {/*********************   App Language Menu - Top Navigatoin   *******************/}
        <LangItemMenu
          locale={currentLocale}
          handleChangeMode={handleSwitchLanguage}
        />

        {/*********************   Switch theme mode - Top Navigatoin   *******************/}
        <ThemeItemMenu
          darkMode={darkMode}
          handleChangeMode={handleSwitchThemeMode}
        />

        {/*********************   Notification Menu - Top Navigatoin   *******************/}
        <IconButton sx={{ mr: 2 }}>
          <Badge badgeContent={9} color="secondary">
            <NotificationsActiveIcon fontSize="medium" />
          </Badge>
        </IconButton>

        {/*********************   Account Button Menu - Top Navigatoin   *******************/}
        <Box
          sx={{
            position: "relative",
          }}
        >
          {/*************   Image Button Menu   **************/}
          <Avatar
            onClick={handleShowAccountMenu}
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
              src={profile?.image_url ? profile.image_url : ProfileImage}
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
              zIndex: 2,
              width: "20rem",
              minHeight: "10rem",
              background: darkMode ? "rgb(78, 78, 78)" : "rgb(255, 255, 255)",
              boxShadow: darkMode
                ? "0px 0px 7px 0 rgba(255, 255, 255, 0.914)"
                : "0px 0px 7px 0 rgba(0, 0, 0, 0.29)",
              color: darkMode ? clGray100 : clDarkMedium,
              borderRadius: "0.5rem",
              padding: "1rem 1rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",

              visibility: OpenAccountMenu ? "visible" : "hidden",
              opacity: OpenAccountMenu ? 1 : 0,
              transform: OpenAccountMenu ? "scale(1)" : "scale(0.5)",
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
                  src={profile?.image_url ? profile.image_url : ProfileImage}
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
                  {profile ? `${profile.first_name} ${profile.last_name}` : ""}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Prompt",
                    fontWeight: 400,
                    fontSize: "1rem",
                    opacity: 0.7,
                  }}
                >
                  {profile?.email ? profile.email : ""}
                </Typography>
              </Box>
            </Box>
            <Divider sx={{ my: 2 }} />

            {/**************    Profile Menu   ***************/}
            <ItemMenu
              text={t("topNav.accountListItemMenu.profile")}
              menuType="title"
              Icon={ManageAccountsIcon}
              handleSelectItemMenu={handleSelectItem}
              itemSelectType={NavMenuType.PROFILE}
            />

            {/**************    Setting Menu   ***************/}
            <ItemMenu
              text={t("topNav.accountListItemMenu.setting")}
              menuType="title"
              Icon={SettingsIcon}
              handleSelectItemMenu={handleSelectItem}
              itemSelectType={NavMenuType.SETTING}
            />

            {/**************    Analytics Menu   ***************/}
            <ItemMenu
              text={t("topNav.accountListItemMenu.analytic")}
              menuType="title"
              Icon={TrendingUpIcon}
              handleSelectItemMenu={handleSelectItem}
              itemSelectType={NavMenuType.ANALYTIC}
            />

            {/**************    Signout Menu   ***************/}
            <Divider sx={{ mb: 2 }} />
            <ItemMenu
              text={t("topNav.accountListItemMenu.logout")}
              menuType="title"
              Icon={ExitToAppIcon}
              handleSelectItemMenu={handleSelectItem}
              itemSelectType={NavMenuType.LOGOUT}
            />
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
