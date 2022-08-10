import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";

// Material Design
import { Box, CssBaseline, Skeleton, useTheme } from "@mui/material";

// Global state and Types
import {
  useAppDispatch,
  useAppSelector,
} from "@/features/hooks/use-global-state";
import { setAuthSuccess } from "@/features/global-state/reducers/auth";
import { IAuthPayload } from "@/features/interfaces";

// Components
import BlankLayout from "@/components/shares/layouts/blank-layout";
import SidebarMenu from "@/components/dashboard/sidebar-menu";
import TopNavigation from "@/components/dashboard/top-navigation";
import MainContent from "@/components/dashboard/main-content";

//4.13
/***********************************************************************************
 *                          ---   MAIN FUNCTION   ---                              *
 **********************************************************************************/
export default function Dashboard() {
  const theme = useTheme();
  const router = useRouter();
  const [open, setOpen] = React.useState(true);
  const dispatch = useAppDispatch();
  const { user, access_token } = useAppSelector((state) => state.auth);
  const { currentLocale } = useAppSelector((state) => state.gui);

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
          return router.push("/auth/login", "/auth/login", {
            locale: currentLocale,
          });
        }
      }
    };

    getAccountState();

    return () => {
      //
    };
  }, [access_token, currentLocale, dispatch, router, user]);

  const handleShowToastify = () => {
    toast.success("Process is successfull", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1000,
      theme: "colored",
    });
  };

  return (
    <BlankLayout
      title="Dashboard"
      description="dashboard settings"
      isLoading={false}
    >
      <>
        <ToastContainer autoClose={1500} />
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
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
      </>
    </BlankLayout>
  );
}
