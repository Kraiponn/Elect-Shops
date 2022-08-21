import React, { useEffect } from "react";
import { NextRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";

// Global Types
import { IAuthPayload } from "@/features/interfaces";

// Material Design & Components
import { Toolbar, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

import {
  useAppSelector,
  useAppDispatch,
} from "@/features/hooks/use-global-state";
import {
  changeLanguagesMode,
  changeThemeMode,
} from "@/features/global-state/reducers/gui";

// Components
import AccountMenu from "@/components/shares/navigates/desktop/account";
import CartMenu from "@/components/shares/navigates/desktop/cart";
import NotificationMenu from "@/components/shares/navigates/desktop/notify";
import AuthMenu from "@/components/shares/navigates/desktop/auth";
import SearchProductBox from "@/components/shares/ui/search-product-box";
import ThemeItemMenu from "@/components/dashboard/navigations/theme-item-menu";
import LangItemMenu from "@/components/dashboard/navigations/lang-item-menu";

interface IProps {
  router: NextRouter;
  user: IAuthPayload | null | undefined;
  keyword: string;
  searchKey: string;
  setSearchKey: React.Dispatch<React.SetStateAction<string>>;
  handleSearchChange: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  handleKeyPress: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  handleClickSearchBox: () => void;
}

/***********************************************************************************
 *                          ---   MAIN FUNCTION   ---                              *
 **********************************************************************************/
const DesktopNav = ({
  router,
  user,
  keyword,
  searchKey,
  setSearchKey,
  handleSearchChange,
  handleKeyPress,
  handleClickSearchBox,
}: IProps) => {
  const { t } = useTranslation("common");
  const dispatch = useAppDispatch();
  const { currentLocale, darkMode } = useAppSelector((state) => state.gui);

  const handleSwitchThemeMode = () => {
    dispatch(changeThemeMode());
  };

  const handleSwitchLanguage = () => {
    dispatch(changeLanguagesMode());
  };

  useEffect(() => {
    if (keyword !== "") {
      setSearchKey(keyword);
    }

    router.push(router.asPath, router.asPath, {
      locale: currentLocale,
    });

    return () => {
      // console.log("Unmounting the page");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLocale, keyword, setSearchKey]);

  return (
    <Toolbar>
      <HomeIcon fontSize="large" />
      <Typography
        variant="h4"
        sx={{
          ml: 1,
          cursor: "pointer",
        }}
        onClick={() => router.push("/")}
      >
        {t("topNavigation.appbarTitle")}
      </Typography>

      <SearchProductBox
      // keyword={searchKey}
      // placehoder={t("topNavigation.searchBox")}
      // handleSearchChange={handleSearchChange}
      // handleKeyPress={handleKeyPress}
      // handleClickSearchBox={handleClickSearchBox}
      />

      {user ? <NotificationMenu /> : null}

      {/*********************   App Language Menu - Top Navigatoin   *******************/}
      <LangItemMenu
        locale={currentLocale}
        handleChangeMode={handleSwitchLanguage}
      />

      {/*********************   Switch theme mode - Top Navigatoin   *******************/}
      <ThemeItemMenu
        darkMode={darkMode}
        handleChangeMode={handleSwitchThemeMode}
      />

      <CartMenu />

      {user ? <AccountMenu /> : null}

      {!user && (
        <AuthMenu
          login={t("topNavigation.authMenu.login")}
          signup={t("topNavigation.authMenu.signup")}
        />
      )}
    </Toolbar>
  );
};

export default DesktopNav;
