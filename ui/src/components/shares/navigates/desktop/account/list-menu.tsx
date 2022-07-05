import React from "react";
import { useRouter } from "next/router";

// Material design
import { Box, Divider, Typography } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LogoutIcon from "@mui/icons-material/Logout";

// Global state
import {
  useAppSelector,
  useAppDispatch,
} from "@/features/hooks/use-global-state";
import { systemLogout } from "@/features/global-state/reducers/auth";

// Components
import AccountDetail from "@/components/shares/navigates/desktop/account/account-detail";
import ItemMenu from "@/components/shares/navigates/desktop/item-menu";
import { MenuType } from "@/components/shares/navigates/enum";

/***********************************************
 *                MAIN METHOD                  *
 **********************************************/
const MenuList = () => {
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
    <>
      <AccountDetail
        user_name={user?.user_name}
        email={user?.email}
        image_url={user?.image_url}
      />

      <Divider sx={{ my: 2 }} />

      <ItemMenu
        menuType={MenuType.ACCOUNT_SETTING}
        title={`Account settings`}
        Icon={ManageAccountsIcon}
        handleSelectedItem={handleItemSelectedType}
      />

      <ItemMenu
        menuType={MenuType.PAYMENT_METHOD}
        title={`Payment methods`}
        Icon={AttachMoneyIcon}
        handleSelectedItem={handleItemSelectedType}
      />

      <ItemMenu
        menuType={MenuType.PAYMENT_METHOD}
        title={`App Settings`}
        Icon={SettingsIcon}
        handleSelectedItem={handleItemSelectedType}
      />

      <Divider sx={{ my: 2 }} />

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginX: '0.75rem',
          marginBottom: '1rem',
          "&:hover": {
            color: "red",
          },
        }}
      >
        <LogoutIcon color="inherit" />
        <Typography
          onClick={handleSystemLogout}
          sx={{
            fontFamily: "PromptMedium",
            fontSize: "1rem",
            ml: 1,
          }}
        >
          {`Log Out`}
        </Typography>
      </Box>
    </>
  );
};

export default MenuList;
