import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import useTranslation from "next-translate/useTranslation";

// Material Design
import {
  styled,
  Typography,
  Breadcrumbs,
  Box,
  Tabs,
  Tab,
  Grid,
  Avatar,
  IconButton,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

// Global state
import {
  useAppSelector,
  useAppDispatch,
} from "@/features/hooks/use-global-state";
import { closeAccountMenu } from "@/features/global-state/reducers/gui";

// Components
import TabPanel from "@/components/dashboard/content/profile/tab-panel";
import Profile from "@/components/dashboard/content/profile";
import Security from "@/components/dashboard/content/profile/security";
import ProfileImage from "@/assets/images/little-pug-dog.webp";

/*******************************************************************************
 *                           Constant and Types                                *
 ******************************************************************************/
import { DRAWER_WIDTH } from "@/components/dashboard/utils/constants";
import {
  clBlack,
  clDarkHard,
  clDarkPrimary,
  clGray50,
  clWhiteGray,
} from "@/features/const/colors";

interface IProps {
  open: boolean;
}

interface IProfileMenu {
  profileTabNo: number;
}

const Main = styled("main", {
  shouldForwardProp: (prop) => prop !== "open" && prop !== "dark_mode",
})<{
  open?: boolean;
  dark_mode?: boolean;
}>(({ theme, open, dark_mode }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${DRAWER_WIDTH}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
  height: "100%",
  background: dark_mode ? clDarkHard : "rgba(185, 215, 228, 0.091)",
  color: dark_mode ? clWhiteGray : clDarkPrimary,
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

/***********************************************************************************
 *                          ---   MAIN FUNCTION   ---                              *
 **********************************************************************************/
export default function Content({ open }: IProps) {
  const dispatch = useAppDispatch();
  const { t } = useTranslation("dashboard");
  const { darkMode } = useAppSelector((state) => state.gui);
  const [profileTabNo, setProfileTabNo] = useState<IProfileMenu>({
    profileTabNo: 0,
  });

  const handleCloseAccountMenu = () => {
    dispatch(closeAccountMenu());
  };

  const handleChange = (event: React.SyntheticEvent, index: number) => {
    setProfileTabNo({ ...profileTabNo, profileTabNo: index });
  };

  return (
    <Main open={open} dark_mode={darkMode} onClick={handleCloseAccountMenu}>
      <DrawerHeader />
      <Breadcrumbs
        sx={{
          marginBottom: "1rem",
          color: darkMode ? clWhiteGray : clBlack,
        }}
      >
        <Link href="/" passHref>
          <Box
            sx={{
              display: "flex",
              "&:hover": {
                cursor: "pointer",
                transform: "scale(1.1)",
                color: "red",
                ".home-icon": {
                  color: "red",
                },
              },
            }}
          >
            <HomeIcon
              className="home-icon"
              sx={{ fontSize: "1.35rem", color: "#333232b9" }}
            />
            <Typography variant="subtitle2" sx={{ fontWeight: 400, ml: "3px" }}>
              {t("content.breadcrumbs.home")}
            </Typography>
          </Box>
        </Link>

        <Link href="/products/cart" passHref>
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 400,
              "&:hover": {
                cursor: "pointer",
                color: "red",
                transform: "scale(1.1)",
              },
            }}
          >
            {t("content.breadcrumbs.cart")}
          </Typography>
        </Link>

        <Typography
          variant="subtitle2"
          sx={{ fontWeight: "900", fontStyle: "italic" }}
        >
          {t("content.breadcrumbs.dashboard")}
        </Typography>
      </Breadcrumbs>

      <Box sx={{ width: "100%", padding: "1rem" }}>
        <Typography
          variant="h4"
          sx={{ color: darkMode ? clGray50 : "#010101a6" }}
        >
          {t("content.account.title")}
        </Typography>

        <Tabs
          value={profileTabNo.profileTabNo}
          onChange={handleChange}
          aria-label="profile tab menu"
          sx={{
            marginTop: "0.5rem",
            ".profile-tab": {
              fontFamily: "Prompt",
              fontWeight: 500,
              fontSize: "1.1rem",
            },
          }}
        >
          <Tab
            className="profile-tab"
            label={t("content.account.profile.title")}
            id={`profile-tab-${0}`}
          />
          <Tab
            className="profile-tab"
            label={t("content.account.security.title")}
            id={`profile-tab-${1}`}
          />
          <Tab
            className="profile-tab"
            label={t("content.account.address.title")}
            id={`profile-tab-${2}`}
          />
        </Tabs>

        {/* <Box> */}
        <TabPanel value={profileTabNo.profileTabNo} index={0}>
          <Profile darkMode={darkMode} />
        </TabPanel>

        <TabPanel value={profileTabNo.profileTabNo} index={1}>
          <Security darkMode={darkMode} />
        </TabPanel>

        <TabPanel value={profileTabNo.profileTabNo} index={2}>
          Item Three
        </TabPanel>
        {/* </Box> */}
      </Box>
    </Main>
  );
}
