import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";

// Material Design
import { styled, Typography, Breadcrumbs, Box } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

// Global state
import {
  useAppSelector,
  useAppDispatch,
} from "@/features/hooks/use-global-state";
import { closeAccountMenu } from "@/features/global-state/reducers/gui";

// Components
import AccountSetting from "@/components/dashboard/content/general/account-setting";
import BankAndCard from "@/components/dashboard/content/general/account-setting/bank-card";
import Billing from "@/components/dashboard/content/general/account-setting/billing";
import Team from "@/components/dashboard/content/general/account-setting/team";
import Purchase from "@/components/dashboard/content/general/purchase";
import Notification from "@/components/dashboard/content/general/notification";
import Customer from "@/components/dashboard/content/management/customers";
import Product from "@/components/dashboard/content/management/products";
import Order from "@/components/dashboard/content/management/orders";
import Category from "@/components/dashboard/content/management/categories";

/*******************************************************************************
 *                           Constant and Types                                *
 ******************************************************************************/
import { DRAWER_WIDTH } from "@/components/dashboard/utils/constants";
import {
  clBlack,
  clDarkPrimary,
  clGray100,
  clWhiteGray,
} from "@/features/const/colors";

interface IProps {
  open: boolean;
}

const Main = styled("main", {
  shouldForwardProp: (prop) => prop !== "open" && prop !== "dark_mode",
})<{
  open?: boolean;
  dark_mode?: boolean;
}>(({ theme, open, dark_mode }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${DRAWER_WIDTH}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
  // background: dark_mode ? clDarkHard : clBgLight,
  color: dark_mode ? clWhiteGray : clDarkPrimary,
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

/***********************************************************************************
 *                          ---   MAIN FUNCTION   ---                              *
 **********************************************************************************/
export default function Content({ open }: IProps) {
  const dispatch = useAppDispatch();
  const { locale } = useRouter();
  const { t } = useTranslation("dashboard");
  const { darkMode, OpenAccountMenu } = useAppSelector((state) => state.gui);
  const { sidebarListItemMenu } = useAppSelector((state) => state.dashboard);

  const handleCloseAccountMenu = () => {
    if (OpenAccountMenu) dispatch(closeAccountMenu());
  };

  const handleShowDashboardContent = () => {
    if (
      (sidebarListItemMenu.account && sidebarListItemMenu.accountSetting) ||
      (!sidebarListItemMenu.account && sidebarListItemMenu.accountSetting)
    )
      return <AccountSetting darkMode={darkMode} />;
    else if (
      (sidebarListItemMenu.account && sidebarListItemMenu.bankCard) ||
      (!sidebarListItemMenu.account && sidebarListItemMenu.bankCard)
    )
      return <BankAndCard darkMode={darkMode} />;
    else if (
      (sidebarListItemMenu.account && sidebarListItemMenu.billing) ||
      (!sidebarListItemMenu.account && sidebarListItemMenu.billing)
    )
      return <Billing darkMode={darkMode} />;
    else if (
      (sidebarListItemMenu.account && sidebarListItemMenu.team) ||
      (!sidebarListItemMenu.account && sidebarListItemMenu.team)
    )
      return <Team darkMode={darkMode} />;
    else if (sidebarListItemMenu.purchase)
      return <Purchase darkMode={darkMode} />;
    else if (sidebarListItemMenu.notifications)
      return <Notification darkMode={darkMode} />;
    else if (sidebarListItemMenu.customers)
      return <Customer darkMode={darkMode} />;
    else if (sidebarListItemMenu.products)
      return <Product darkMode={darkMode} />;
    else if (sidebarListItemMenu.orders) return <Order darkMode={darkMode} />;
    else if (sidebarListItemMenu.categories) return <Category />;
  };

  return (
    <Main
      className="main-content_container"
      open={open}
      dark_mode={darkMode}
      onClick={handleCloseAccountMenu}
    >
      <DrawerHeader />
      <Breadcrumbs
        sx={{
          marginBottom: "1rem",
          color: darkMode ? clWhiteGray : clBlack,
        }}
      >
        <Link href="/" passHref locale={locale}>
          <Box
            sx={{
              display: "flex",
              "&:hover": {
                cursor: "pointer",
                transform: "scale(1.1)",
                color: "red",
                ".home-icon": {
                  color: "red",
                },
              },
            }}
          >
            <HomeIcon
              className="home-icon"
              sx={{
                fontSize: "1.35rem",
                color: darkMode ? clGray100 : "#333232b9",
              }}
            />
            <Typography variant="subtitle2" sx={{ fontWeight: 400, ml: "3px" }}>
              {t(`content.breadcrumbs.home`)}
            </Typography>
          </Box>
        </Link>

        <Link href="/search" as={`/search?keyword=`} locale={locale} passHref>
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 400,
              "&:hover": {
                cursor: "pointer",
                color: "red",
                transform: "scale(1.1)",
              },
            }}
          >
            {t(`content.breadcrumbs.product`)}
          </Typography>
        </Link>

        <Typography
          variant="subtitle2"
          sx={{ fontWeight: "900", fontStyle: "italic" }}
        >
          {t(`content.breadcrumbs.dashboard`)}
        </Typography>
      </Breadcrumbs>

      {handleShowDashboardContent()}
    </Main>
  );
}
