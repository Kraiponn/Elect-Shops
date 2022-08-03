import React, { useState } from "react";

// Material Design
import { Drawer, IconButton, Theme } from "@mui/material";

// Icons
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";

// Components
import GeneralListMenu from "@/components/dashboard/navigations/general-list-menu";
import MangeListMenu from "@/components/dashboard/navigations/manage-list-menu";
import SidebarHeaderMenu from "@/components/dashboard/navigations/sidebar-header-menu";

/*******************************************************************************
 *                           Constant and Types                                *
 ******************************************************************************/
import { DRAWER_WIDTH } from "@/components/dashboard/utils/constants";
import {
  NavMenuType,
  ISidebarMenuState,
} from "@/components/dashboard/utils/types";
import { IAuthPayload } from "@/features/types";

// const DrawerHeader = styled("div")(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   padding: theme.spacing(0, 1),
//   // necessary for content to be below app bar
//   ...theme.mixins.toolbar,
//   justifyContent: "flex-end",
// }));

const initialMenuState: ISidebarMenuState = {
  account: false,
  profile: false,
  changePassword: false,
  security: false,
  team: false,
  purchase: false,
  notifications: false,
  customers: false,
  products: false,
  orders: false,
  invoices: false,
};

interface IProps {
  open: boolean;
  theme: Theme;
  user: IAuthPayload;
  handleDrawerClose: () => void;
}

/***********************************************************************************
 *                          ---   MAIN FUNCTION   ---                              *
 **********************************************************************************/
export default function SidebarMenu({
  open,
  theme,
  user,
  handleDrawerClose,
}: IProps) {
  const [navState, setNavState] = useState<ISidebarMenuState>(initialMenuState);

  const handleSelectItemMenu = (item: NavMenuType) => {
    switch (item) {
      case NavMenuType.ACCOUNT:
        setNavState({
          ...navState,
          account: !navState.account,
        });
        break;

      case NavMenuType.PROFILE:
        setNavState({
          ...initialMenuState,
          account: true,
          profile: true,
        });
        break;

      case NavMenuType.CHANGE_PASSWORD:
        setNavState({
          ...initialMenuState,
          account: true,
          changePassword: true,
        });
        break;

      case NavMenuType.SECURITY:
        setNavState({
          ...initialMenuState,
          account: true,
          security: true,
        });
        break;

      case NavMenuType.TEAM:
        setNavState({
          ...initialMenuState,
          account: true,
          team: true,
        });
        break;

      case NavMenuType.PURCHASE:
        setNavState({
          ...initialMenuState,
          purchase: true,
        });
        break;

      case NavMenuType.NOTIFICATION:
        setNavState({
          ...initialMenuState,
          notifications: true,
        });
        break;

      case NavMenuType.CUSTOMER:
        setNavState({
          ...initialMenuState,
          customers: true,
        });
        break;

      case NavMenuType.PRODUCT:
        setNavState({
          ...initialMenuState,
          products: true,
        });
        break;

      case NavMenuType.ORDER:
        setNavState({
          ...initialMenuState,
          orders: true,
        });
        break;

      case NavMenuType.INVOICE:
        setNavState({
          ...initialMenuState,
          invoices: true,
        });
        break;

      default:
        setNavState({
          ...navState,
          account: !navState.account,
        });
    }
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
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
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
            // fontSize="large"
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
        userName={user?.user_name ? user.user_name : ""}
        imageUrl={user?.image_url ? user.image_url : ""}
      />

      {/***************  Account List Item Menu  ******************/}
      <GeneralListMenu
        open={navState.account}
        handleSelectItemMenu={handleSelectItemMenu}
        currentItem={navState}
      />

      {/***************  Management List Item Menu  ***************/}
      <MangeListMenu
        handleSelectItemMenu={handleSelectItemMenu}
        currentItem={navState}
      />
    </Drawer>
  );
}
