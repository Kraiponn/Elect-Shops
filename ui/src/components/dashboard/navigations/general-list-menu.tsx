import React from "react";

// Material Design
import { Box, Collapse, Divider, IconButton, Typography } from "@mui/material";

// Icons
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import NotificationsIcon from "@mui/icons-material/Notifications";

// Components
import AccountItemMenu from "@/components/dashboard/navigations/item-menu";

// Types
import {
  ISidebarMenuState,
  NavMenuType,
} from "@/components/dashboard/utils/types";

interface IProps {
  open: boolean;
  handleSelectItemMenu: (menuType: NavMenuType) => void;
  currentItem: ISidebarMenuState;
}

/***********************************************************************************
 *                          ---   MAIN FUNCTION   ---                              *
 **********************************************************************************/
export default function GeneralListMenu({
  open,
  handleSelectItemMenu,
  currentItem,
}: IProps) {
  return (
    <>
      <Box
        sx={{
          width: "100%",
          padding: "0.5rem",
          "&:hover": {
            cursor: "pointer",
          },
        }}
      >
        {/***************  Title Categories  ***************/}
        <Typography
          sx={{
            fontFamily: "Prompt",
            fontSize: "0.89rem",
            fontWeight: 500,
            opacity: 0.5,
            mt: 1,
          }}
        >
          {`GENERAL`}
        </Typography>

        {/***************  Account Item Menu  ***************/}
        <Box sx={{ marginBottom: "0.5rem" }}>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                ml: 1,
                "&:hover": {
                  color: "red",
                },
              }}
            >
              <AccountCircleIcon sx={{ fontSize: "1.45rem" }} />
              <Typography
                sx={{
                  fontFamily: "Prompt",
                  fontWeight: 500,
                  fontSize: "1.1rem",
                  ml: "0.5rem",
                  "&:hover": {
                    color: "red",
                  },
                }}
              >{`Account`}</Typography>
            </Box>

            {open ? (
              <IconButton
                onClick={() => handleSelectItemMenu(NavMenuType.ACCOUNT)}
              >
                <ExpandMore />
              </IconButton>
            ) : (
              <IconButton
                onClick={() => handleSelectItemMenu(NavMenuType.ACCOUNT)}
              >
                <NavigateNextIcon />
              </IconButton>
            )}
          </Box>

          <Collapse in={open} sx={{ pl: "3.5rem" }}>
            <AccountItemMenu
              text="Profile"
              menuType="subtitle"
              handleSelectItemMenu={handleSelectItemMenu}
              itemSelectType={NavMenuType.PROFILE}
              isActive={currentItem.profile ? true : false}
            />
            <AccountItemMenu
              text="Change Password"
              menuType="subtitle"
              handleSelectItemMenu={handleSelectItemMenu}
              itemSelectType={NavMenuType.CHANGE_PASSWORD}
              isActive={currentItem.changePassword ? true : false}
            />
            <AccountItemMenu
              text="Security"
              menuType="subtitle"
              handleSelectItemMenu={handleSelectItemMenu}
              itemSelectType={NavMenuType.SECURITY}
              isActive={currentItem.security ? true : false}
            />
            <AccountItemMenu
              text="Team"
              menuType="subtitle"
              handleSelectItemMenu={handleSelectItemMenu}
              itemSelectType={NavMenuType.TEAM}
              isActive={currentItem.team ? true : false}
            />
          </Collapse>
        </Box>

        {/***************  Purchase Item Menu  ***************/}
        <AccountItemMenu
          text="Purchase"
          menuType="title"
          Icon={ShoppingBasketIcon}
          handleSelectItemMenu={handleSelectItemMenu}
          itemSelectType={NavMenuType.PURCHASE}
          isActive={currentItem.purchase ? true : false}
        />

        {/***************  Notifications Item Menu  ***************/}
        <AccountItemMenu
          text="Notifications"
          menuType="title"
          Icon={NotificationsIcon}
          handleSelectItemMenu={handleSelectItemMenu}
          itemSelectType={NavMenuType.NOTIFICATION}
          isActive={currentItem.notifications ? true : false}
        />
      </Box>
      <Divider />
    </>
  );
}
