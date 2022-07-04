import React from "react";
import { useRouter } from "next/router";

// Material design
import { Box, Divider } from "@mui/material";
// import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
// import PaidIcon from "@mui/icons-material/Paid";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import NotificationsIcon from "@mui/icons-material/Notifications";
import EmailIcon from "@mui/icons-material/Email";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

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

interface IProps {}

/***********************************************
 *                MAIN METHOD                  *
 **********************************************/
const MobileListMenu = ({}: IProps) => {
  const router = useRouter();
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleSystemLogout = () => {
    dispatch(systemLogout());
    router.push("/auth/login");
  };

  const handleItemSelectedType = (menuType: MenuType) => {
    // console.log("Item select: ", menuType);

    switch (menuType) {
      case MenuType.REGISTER:
        router.push("/auth/signup");
        break;
      case MenuType.LOGIN:
        router.push("/auth/login");
        break;
      case MenuType.ACCOUNT_SETTING:
        router.push("/auth/profile/settings");
        break;
      default:
        router.push("/");
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        overflowY: "auto",
      }}
    >
      {!user ? null : (
        <AccountBanner
          userName={user?.user_name}
          email={user?.email}
          imageUrl={user?.image_url}
        />
      )}

      {/*****************  Still Not Authentication *****************/}
      {user ? null : (
        <>
          <MenuItem
            isTitle={true}
            titleLabel={`Authentication`}
            menuType={MenuType.REGISTER}
            text={`Sign Up`}
            showIcon={true}
            amount={0}
            Icon={AppRegistrationIcon}
            handleItemSelect={handleItemSelectedType}
          />
          <MenuItem
            isTitle={false}
            menuType={MenuType.LOGIN}
            text={`Log In`}
            showIcon={true}
            amount={0}
            Icon={VpnKeyIcon}
            handleItemSelect={handleItemSelectedType}
          />
          <Divider sx={{ my: 2 }} />
        </>
      )}

      {/*****************  Alert Group *****************/}
      {!user ? null : (
        <>
          <MenuItem
            isTitle={true}
            titleLabel={`Alert`}
            menuType={MenuType.NOTIFICATION}
            text={`Notifications`}
            showIcon={true}
            amount={7}
            Icon={NotificationsIcon}
            handleItemSelect={handleItemSelectedType}
          />
          <MenuItem
            isTitle={false}
            menuType={MenuType.MESSAGE}
            text={`Messages`}
            showIcon={true}
            amount={8}
            Icon={EmailIcon}
            handleItemSelect={handleItemSelectedType}
          />
          <MenuItem
            isTitle={false}
            menuType={MenuType.WISHLIST}
            text={`Wishlist`}
            showIcon={true}
            amount={9}
            Icon={FavoriteIcon}
            handleItemSelect={handleItemSelectedType}
          />
          <Divider sx={{ my: 2 }} />
        </>
      )}

      {/*****************  Account Menu Group *****************/}
      {!user ? null : (
        <>
          <MenuItem
            isTitle={true}
            titleLabel={`Account`}
            menuType={MenuType.ACCOUNT_SETTING}
            text={`Account settings`}
            showIcon={true}
            Icon={ArrowForwardIosIcon}
            handleItemSelect={handleItemSelectedType}
          />
          <MenuItem
            isTitle={false}
            menuType={MenuType.PAYMENT_METHOD}
            text={`Payment method`}
            showIcon={true}
            Icon={ArrowForwardIosIcon}
            handleItemSelect={handleItemSelectedType}
          />
          <MenuItem
            isTitle={false}
            menuType={MenuType.PURCHASE_HISTORY}
            text={`Purchase history`}
            showIcon={true}
            Icon={ArrowForwardIosIcon}
            handleItemSelect={handleItemSelectedType}
          />
          <Divider sx={{ my: 2 }} />
        </>
      )}

      {/*****************  Most Popular Menu Group *****************/}
      <>
        <MenuItem
          isTitle={true}
          titleLabel={`Most popular`}
          menuType={MenuType.ACCOUNT_SETTING}
          text={`Food`}
          showIcon={true}
          Icon={ArrowForwardIosIcon}
          handleItemSelect={handleItemSelectedType}
        />
        <MenuItem
          isTitle={false}
          menuType={MenuType.PURCHASE_HISTORY}
          text={`E-book`}
          showIcon={true}
          Icon={ArrowForwardIosIcon}
          handleItemSelect={handleItemSelectedType}
        />
        <MenuItem
          isTitle={false}
          menuType={MenuType.PURCHASE_HISTORY}
          text={`Online courses`}
          showIcon={true}
          Icon={ArrowForwardIosIcon}
          handleItemSelect={handleItemSelectedType}
        />
        <MenuItem
          isTitle={false}
          menuType={MenuType.PURCHASE_HISTORY}
          text={`Smart farm`}
          showIcon={true}
          Icon={ArrowForwardIosIcon}
          handleItemSelect={handleItemSelectedType}
        />
        <MenuItem
          isTitle={false}
          menuType={MenuType.PURCHASE_HISTORY}
          text={`Embedded system`}
          showIcon={true}
          Icon={ArrowForwardIosIcon}
          handleItemSelect={handleItemSelectedType}
        />
        <MenuItem
          isTitle={false}
          menuType={MenuType.PURCHASE_HISTORY}
          text={`Graphic design`}
          showIcon={true}
          Icon={ArrowForwardIosIcon}
          handleItemSelect={handleItemSelectedType}
        />
        <Divider sx={{ my: 2 }} />
      </>

      {/*****************  More From US Menu Group *****************/}
      <>
        <MenuItem
          isTitle={true}
          titleLabel={`More from Us`}
          menuType={MenuType.GET_THE_APP}
          text={`Get the app`}
          showIcon={true}
          Icon={ArrowForwardIosIcon}
          handleItemSelect={handleItemSelectedType}
        />
        <MenuItem
          isTitle={false}
          menuType={MenuType.INVITE_FRIENDS}
          text={`Invite friends`}
          showIcon={true}
          Icon={ArrowForwardIosIcon}
          handleItemSelect={handleItemSelectedType}
        />
        <MenuItem
          isTitle={false}
          menuType={MenuType.HELP}
          text={`Help`}
          showIcon={true}
          Icon={ArrowForwardIosIcon}
          handleItemSelect={handleItemSelectedType}
        />
        <Divider sx={{ my: 2 }} />
      </>

      {user ? <LogoutMenu handleSystemLogout={handleSystemLogout} /> : null}
    </Box>
  );
};

export default MobileListMenu;
