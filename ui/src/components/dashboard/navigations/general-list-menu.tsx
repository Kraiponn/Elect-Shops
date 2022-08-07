import React from "react";
import useTranslation from "next-translate/useTranslation";

// Material Design
import { Box, Collapse, Divider, IconButton, Typography } from "@mui/material";

// Icons
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import NotificationsIcon from "@mui/icons-material/Notifications";

// Global state & Types
import { useAppSelector } from "@/features/hooks/use-global-state";

// Components
import AccountItemMenu from "@/components/dashboard/navigations/text-icon-item-menu";

// Types
import {
  ISidebarMenuState,
  NavMenuType,
} from "@/components/dashboard/utils/types";
import { clGray100 } from "@/features/const/colors";

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
  const { currentLocale } = useAppSelector((state) => state.gui);
  const { t } = useTranslation("dashboard");

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
          {t("leftSideNav.general")}
        </Typography>

        {/***************  Account Item Menu  ***************/}
        <Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              padding: "0 1rem",
              mt: 1.5,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                // ml: 1,
                "&:hover": {
                  color: "#14b67a",
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
                }}
              >
                {t("leftSideNav.account")}
              </Typography>
            </Box>

            {open ? (
              <IconButton
                onClick={() => handleSelectItemMenu(NavMenuType.ACCOUNT)}
              >
                <ExpandMore sx={{ color: clGray100 }} />
              </IconButton>
            ) : (
              <IconButton
                onClick={() => handleSelectItemMenu(NavMenuType.ACCOUNT)}
              >
                <NavigateNextIcon sx={{ color: clGray100 }} />
              </IconButton>
            )}
          </Box>

          <Collapse in={open} sx={{ pl: "3.5rem" }}>
            <AccountItemMenu
              text={t("leftSideNav.profile")}
              menuType="subtitle"
              handleSelectItemMenu={handleSelectItemMenu}
              itemSelectType={NavMenuType.PROFILE}
              isActive={currentItem.profile ? true : false}
            />
            <AccountItemMenu
              text={t("leftSideNav.bankAndCard")}
              menuType="subtitle"
              handleSelectItemMenu={handleSelectItemMenu}
              itemSelectType={NavMenuType.BANK_CARD}
              isActive={currentItem.bankCard ? true : false}
            />
            <AccountItemMenu
              text={t("leftSideNav.billing")}
              menuType="subtitle"
              handleSelectItemMenu={handleSelectItemMenu}
              itemSelectType={NavMenuType.BILLING}
              isActive={currentItem.billing ? true : false}
            />
            <AccountItemMenu
              text={t("leftSideNav.team")}
              menuType="subtitle"
              handleSelectItemMenu={handleSelectItemMenu}
              itemSelectType={NavMenuType.TEAM}
              isActive={currentItem.team ? true : false}
            />
          </Collapse>
        </Box>

        {/***************  Purchase Item Menu  ***************/}
        <AccountItemMenu
          text={t("leftSideNav.purchase")}
          menuType="title"
          Icon={ShoppingBasketIcon}
          handleSelectItemMenu={handleSelectItemMenu}
          itemSelectType={NavMenuType.PURCHASE}
          isActive={currentItem.purchase ? true : false}
        />

        {/***************  Notifications Item Menu  ***************/}
        <AccountItemMenu
          text={t("leftSideNav.notification")}
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
