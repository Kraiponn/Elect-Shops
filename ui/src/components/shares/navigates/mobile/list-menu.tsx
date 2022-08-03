import React from "react";
import { useRouter } from "next/router";

// Material design
import { Box } from "@mui/material";

// Global state
import {
  useAppSelector,
  useAppDispatch,
} from "@/features/hooks/use-global-state";
import { systemLogout } from "@/features/global-state/reducers/auth";

// Components
import { MenuType } from "@/components/shares/navigates/enum";
import LogoutMenu from "@/components/shares/navigates/mobile/logout-menu";
import AccountBanner from "@/components/shares/navigates/mobile/account-banner";
import NotAuthItemMenuGroup from "@/components/shares/navigates/mobile/item-group-menu/not-auth"
import AlertItemMenuGroup from "@/components/shares/navigates/mobile/item-group-menu/alert"
import AccountItemMenuGroup from "@/components/shares/navigates/mobile/item-group-menu/account"
import MostPopularItemMenuGroup from "@/components/shares/navigates/mobile/item-group-menu/most-popular"
import MoreFromUsItemMenuGroup from "@/components/shares/navigates/mobile/item-group-menu/more-from-us"

interface IProps { }

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
    // console.log("Item select: ", menuType);
    switch (menuType) {
      case MenuType.REGISTER:
        router.push("/auth/signup");
        break;
      case MenuType.LOGIN:
        router.push("/auth/login");
        break;
      case MenuType.ACCOUNT_SETTING:
        router.push("/account/dashboard");
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
      {user ? null : (<NotAuthItemMenuGroup handleItemSelectedType={handleItemSelectedType} />)}

      {/*****************  Alert Group *****************/}
      {!user ? null : (<AlertItemMenuGroup handleItemSelectedType={handleItemSelectedType} />)}

      {/*****************  Account Menu Group *****************/}
      {!user ? null : (<AccountItemMenuGroup handleItemSelectedType={handleItemSelectedType} />)}

      {/*****************  Most Popular Menu Group *****************/}
      <MostPopularItemMenuGroup handleItemSelectedType={handleItemSelectedType} />

      {/*****************  More From US Menu Group *****************/}
      <MoreFromUsItemMenuGroup
        handleItemSelectedType={handleItemSelectedType}
      />

      {user ? <LogoutMenu handleSystemLogout={handleSystemLogout} /> : null}
    </Box>
  );
};

export default MobileListMenu;
