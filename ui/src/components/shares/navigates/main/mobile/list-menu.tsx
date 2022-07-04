import React from "react";
import { useRouter } from "next/router";

// Material design
import { Box, Divider } from "@mui/material";
// import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
// import PaidIcon from "@mui/icons-material/Paid";
import NotificationsIcon from "@mui/icons-material/Notifications";
import EmailIcon from "@mui/icons-material/Email";

// Global state
import {
  useAppSelector,
  useAppDispatch,
} from "@/features/hooks/use-global-state";
import { systemLogout } from "@/features/global-state/reducers/auth";

// Components
import MenuItem from "@/components/shares/navigates/main/mobile/item-menu";
import { MenuType } from "@/components/shares/navigates/main/enum";
import LogoutMenu from "@/components/shares/navigates/main/mobile/logout-menu";
import AccountBanner from "@/components/shares/navigates/main/mobile/account-banner";

interface IProps {

}

/***********************************************
 *                MAIN METHOD                  *
 **********************************************/
const MobileListMenu = ({ }: IProps) => {
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
      <AccountBanner
        userName={user?.user_name}
        email={user?.email}
        imageUrl={user?.image_url}
      />

      <MenuItem
        isTitle={true}
        titleLabel={`Alert`}
        menuType={MenuType.NOTIFICATION}
        text={`Notifications`}
        showIcon={true}
        amount={10}
        Icon={NotificationsIcon}
        handleSelectedItem={handleItemSelectedType}
      />

      <MenuItem
        isTitle={false}
        menuType={MenuType.MESSAGE}
        text={`Messages`}
        showIcon={true}
        amount={99}
        Icon={EmailIcon}
        handleSelectedItem={handleItemSelectedType}
      />

      <Divider sx={{ my: 2 }} />

      <MenuItem
        isTitle={true}
        titleLabel={`Account`}
        menuType={MenuType.ACCOUNT_SETTING}
        text={`Account settings`}
        showIcon={false}
        Icon={null}
        handleSelectedItem={handleItemSelectedType}
      />

      <MenuItem
        isTitle={false}
        menuType={MenuType.PAYMENT_METHOD}
        text={`Payment method`}
        showIcon={false}
        Icon={null}
        handleSelectedItem={handleItemSelectedType}
      />

      <Divider sx={{ my: 2 }} />

      <LogoutMenu handleSystemLogout={handleSystemLogout} />
    </Box>
  );
};

export default MobileListMenu;
