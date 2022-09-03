import React, { useEffect } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { requireAuthentication } from "@/features/services/secure/require-auth";

// Material Design
import { Box, CssBaseline, useTheme } from "@mui/material";

// Global state and Types
import {
  useAppDispatch,
  useAppSelector,
} from "@/features/hooks/use-global-state";
import { fetchProfileById } from "@/features/global-state/reducers/auth";
import { closeAccountMenu } from "@/features/global-state/reducers/gui";

// Components
import BlankLayout from "@/components/shares/layouts/blank-layout";
import SidebarMenu from "@/components/dashboard/sidebar-menu";
import TopNavigation from "@/components/dashboard/top-navigation";
import MainContent from "@/components/dashboard/main-content";

/***********************************************************************************
 *                          ---   MAIN FUNCTION   ---                              *
 **********************************************************************************/
export default function Dashboard() {
  const theme = useTheme();
  const router = useRouter();
  const [open, setOpen] = React.useState(true);
  const dispatch = useAppDispatch();
  const { user, access_token, profile } = useAppSelector((state) => state.auth);
  const { currentLocale } = useAppSelector((state) => state.gui);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  //############################################################
  //                   LIFE CYCLE CONTROL
  //############################################################
  useEffect(() => {
    const getAccountState = async () => {
      if (!access_token || !profile) {
        const _accessToken = Cookies.get("access_token");

        if (_accessToken) {
          dispatch(fetchProfileById());
        } else {
          router.push("/auth/login", "/auth/login", {
            locale: router.locale,
          });
        }
      }
    };

    getAccountState();
    return () => {
      dispatch(closeAccountMenu());
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [access_token, currentLocale, profile, user]);

  return (
    <BlankLayout title="Dashboard" description="dashboard settings">
      <>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <TopNavigation
            open={open}
            profile={profile}
            handleDrawerOpen={handleDrawerOpen}
          />

          <SidebarMenu
            open={open}
            theme={theme}
            profile={profile}
            handleDrawerClose={handleDrawerClose}
          />

          <MainContent open={open} />
        </Box>
      </>
    </BlankLayout>
  );
}

/***********************************************************************************
 *                       ---   SERVER SIDE PART   ---                              *
 **********************************************************************************/
export const getServerSideProps: GetServerSideProps = requireAuthentication(
  async () => {
    return {
      props: {},
    };
  }
);
