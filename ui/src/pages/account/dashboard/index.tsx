import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

// Material Design
import { Box, Skeleton, useTheme } from "@mui/material";

// Global state
import {
  useAppDispatch,
  useAppSelector,
} from "@/features/hooks/use-global-state";
import { setAuthSuccess } from "@/features/global-state/reducers/auth";

// Components
import BlankLayout from "@/components/shares/layouts/blank-layout";
import SidebarMenu from "@/components/dashboard/sidebar-menu";
import TopNavigation from "@/components/dashboard/top-navigation";
import MainContent from "@/components/dashboard/main-content";
import Cookies from "js-cookie";
import { IAuthPayload } from "@/features/types";

/***********************************************************************************
 *                          ---   MAIN FUNCTION   ---                              *
 **********************************************************************************/
export default function Dashboard() {
  const theme = useTheme();
  const router = useRouter();
  const [open, setOpen] = React.useState(true);
  const dispatch = useAppDispatch();
  const { user, access_token } = useAppSelector((state) => state.auth);
  const { isLoading } = useAppSelector((state) => state.product);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const getAccountState = async () => {
      let _user;
      let _accessToken;
      // console.log("Dashboard effect...");

      if (!user && !access_token) {
        _user = Cookies.get("user");
        _accessToken = Cookies.get("access_token");

        if (_user && _accessToken) {
          dispatch(
            setAuthSuccess({
              user: JSON.parse(_user),
              access_token: _accessToken,
            })
          );
        } else {
          return router.push("/auth/login");
        }
      }
    };

    getAccountState();

    return () => {
      //
    };
  }, [access_token, dispatch, router, user]);

  const LoadingConponent = () => {
    console.log("Loading component...");

    return (
      <Box sx={{ width: "100%", minHeight: "100vh" }}>
        <Skeleton variant="text" />
      </Box>
    );
  };

  return (
    <BlankLayout
      title="Dashboard"
      description="dashboard settings"
      isLoading={false}
    >
      <Box sx={{ display: "flex" }}>
        {/* <CssBaseline /> */}
        <TopNavigation
          open={open}
          user={user}
          handleDrawerOpen={handleDrawerOpen}
        />

        <SidebarMenu
          open={open}
          theme={theme}
          user={user as IAuthPayload}
          handleDrawerClose={handleDrawerClose}
        />

        <MainContent open={open} />
      </Box>
    </BlankLayout>
  );
}
