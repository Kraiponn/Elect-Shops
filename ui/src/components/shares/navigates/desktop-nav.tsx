import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";

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

interface IProps {}

/***********************************************************************************
 *                          ---   MAIN FUNCTION   ---                              *
 **********************************************************************************/
const DesktopNav = ({}: IProps) => {
  const { currentLocale, darkMode } = useAppSelector((state) => state.gui);
  const { t } = useTranslation("common");
  const { user } = useAppSelector((state) => state.auth);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleSwitchThemeMode = () => {
    dispatch(changeThemeMode());
  };

  const handleSwitchLanguage = () => {
    dispatch(changeLanguagesMode());
  };

  return (
    <Toolbar>
      <HomeIcon fontSize="large" />
      <Typography
        variant="h4"
        sx={{
          ml: 1,
          cursor: "pointer",
        }}
        onClick={() => router.push("/", "/", { locale: router.locale })}
      >
        {t("topNavigation.appbarTitle")}
      </Typography>

      <SearchProductBox />

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
