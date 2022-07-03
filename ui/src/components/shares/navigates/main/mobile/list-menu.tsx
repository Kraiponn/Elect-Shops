import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";

// Material design
import { Box, Divider, Typography } from "@mui/material";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import PaidIcon from "@mui/icons-material/Paid";
import NotificationsIcon from "@mui/icons-material/Notifications";
import EmailIcon from "@mui/icons-material/Email";

import styled from "@/assets/styles/AccountMenu.module.css";

// Global state
import {
  useAppSelector,
  useAppDispatch,
} from "@/features/hooks/use-global-state";
import { systemLogout } from "@/features/global-state/reducers/auth/auth";
import Cookies from "js-cookie";

// Components
import defaultProfileImage from "@/assets/images/little-pug-dog.webp";
import MenuItem from "@/components/shares/navigates/main/mobile/item-menu";
import { MenuType } from "@/components/shares/navigates/main/enum";

import { clPrimaryDark } from "@/features/const/colors";
import LogoutMenu from "./logout-menu";

interface IProps {
  user_name?: string;
  email?: string;
}

/***********************************************
 *                MAIN METHOD                  *
 **********************************************/
const MobileListMenu = ({ user_name, email }: IProps) => {
  const router = useRouter();
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleSystemLogout = () => {
    dispatch(systemLogout());

    router.push("/auth/login");
  };

  const handleItemSelectedType = (menuType: MenuType) => {
    console.log(menuType);
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        overflowY: "auto",
      }}
    >
      <Box
        sx={{
          width: "100%",
          background: `${clPrimaryDark}`,
          p: 1,
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "5rem",
            height: "5rem",
            borderRadius: "50%",
            textAlign: "center",
            margin: "1rem auto",
          }}
          component="div"
        >
          <Image
            className={styled["account-logo"]}
            src={defaultProfileImage}
            alt="image profile"
            layout="fill"
            objectFit="fill"
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
          }}
        >
          <Typography
            sx={{
              fontSize: "1rem",
            }}
            variant="subtitle1"
          >
            {user_name ? user_name : "XXX"}
          </Typography>
          <Typography
            sx={{
              fontWeight: "100",
              fontFamily: "PromptThin",
              fontSize: "0.89rem",
            }}
          >
            {email ? email : "example@mail.com"}
          </Typography>
        </Box>
      </Box>

      <MenuItem
        menuType={MenuType.ACCOUNT_SETTING}
        title={`Account settings`}
        Icon={ManageAccountsIcon}
        handleSelectedItem={handleItemSelectedType}
      />

      <MenuItem
        menuType={MenuType.PAYMENT_METHOD}
        title={`Payment method`}
        Icon={PaidIcon}
        handleSelectedItem={handleItemSelectedType}
      />

      <MenuItem
        menuType={MenuType.PAYMENT_METHOD}
        title={`Notifications`}
        Icon={NotificationsIcon}
        handleSelectedItem={handleItemSelectedType}
      />

      <MenuItem
        menuType={MenuType.PAYMENT_METHOD}
        title={`Messages`}
        Icon={EmailIcon}
        handleSelectedItem={handleItemSelectedType}
      />

      <Divider sx={{ my: 2 }} />

      <LogoutMenu handleSystemLogout={handleSystemLogout} />
    </Box>
  );
};

export default MobileListMenu;
