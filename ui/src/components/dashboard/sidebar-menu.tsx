import React from "react";

// Material Design
import { Drawer, IconButton, Theme } from "@mui/material";

// Icons
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";

// Global state, Types and Colors system
import {
  useAppDispatch,
  useAppSelector,
} from "@/features/hooks/use-global-state";
import { navDrawerSelectItemChange } from "@/features/global-state/reducers/dashboard";
import { DRAWER_WIDTH } from "@/components/dashboard/utils/constants";
import {
  IAuthPayload,
  IProfile,
  NavMenuType,
  UserType,
} from "@/features/interfaces";
import { clDarkMedium, clGray100 } from "@/features/const/colors";

// Components
import GeneralListMenu from "@/components/dashboard/navigations/general-list-menu";
import MangeListMenu from "@/components/dashboard/navigations/manage-list-menu";
import SidebarHeaderMenu from "@/components/dashboard/navigations/sidebar-header-menu";

// const DrawerHeader = styled("div")(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   padding: theme.spacing(0, 1),
//   // necessary for content to be below app bar
//   ...theme.mixins.toolbar,
//   justifyContent: "flex-end",
// }));

interface IProps {
  open: boolean;
  theme: Theme;
  profile: IProfile | null | undefined;
  handleDrawerClose: () => void;
}

/***********************************************************************************
 *                          ---   MAIN FUNCTION   ---                              *
 **********************************************************************************/
export default function SidebarMenu({
  open,
  theme,
  profile,
  handleDrawerClose,
}: IProps) {
  const { sidebarListItemMenu } = useAppSelector((state) => state.dashboard);
  const dispatch = useAppDispatch();

  const handleSelectItemMenu = (item: NavMenuType) => {
    dispatch(navDrawerSelectItemChange(item));
  };

  return (
    <Drawer
      sx={{
        position: "relative",
        width: DRAWER_WIDTH,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: DRAWER_WIDTH,
          boxSizing: "border-box",
          background: clDarkMedium,
          color: clGray100,
        },
        overflowY: "-moz-hidden-unscrollable",
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      {/**************   Hamburger Button For Close Drawer Menu   ***************/}
      <IconButton
        onClick={handleDrawerClose}
        sx={{
          position: "absolute",
          top: "5%",
          right: "0%",
          zIndex: 10000,
        }}
      >
        {theme.direction === "ltr" ? (
          <ArrowCircleLeftIcon
            sx={{
              color: "rgba(255, 255, 255, 0.585)",
              fontSize: "3rem",
              "&:hover": {
                transform: "scale(1.1)",
                color: "rgb(251, 255, 4)",
              },
            }}
          />
        ) : (
          <ArrowCircleRightIcon />
        )}
      </IconButton>

      {/***************   Header Profile   ******************/}
      <SidebarHeaderMenu
        userName={profile ? `${profile.first_name} ${profile.last_name}` : ""}
        imageUrl={profile?.image_url ? profile.image_url : ""}
      />

      {/***************  Account List Item Menu  ******************/}
      <GeneralListMenu
        open={sidebarListItemMenu.account}
        handleSelectItemMenu={handleSelectItemMenu}
        currentItem={sidebarListItemMenu}
      />

      {/***************  Management List Item Menu  ***************/}
      {profile && profile.role === "ADMIN" ? (
        <MangeListMenu
          handleSelectItemMenu={handleSelectItemMenu}
          currentItem={sidebarListItemMenu}
        />
      ) : null}
    </Drawer>
  );
}
