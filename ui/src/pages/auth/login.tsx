import React from "react";
import { useRouter } from "next/router";

// Materials
import { Box, Grid, useMediaQuery } from "@mui/material";

// Global state
import {
  useAppSelector,
  useAppDispatch,
} from "@/features/hooks/use-global-state";
import {
  asyncAuth,
  clearErrorAndLoadingState,
} from "@/features/global-state/reducers/auth";
import { IAuthForm, IAuthInput } from "@/features/interfaces";

// Components
import BlankLayout from "@/components/shares/layouts/blank-layout";
import MyDialog from "@/components/shares/loader/my-dialog";
import LeftSide from "@/components/auth/login/left-side";
import RightSide from "@/components/auth/login/right-side";

/***********************************************************************************
 *                          ---   MAIN FUNCTION   ---                              *
 **********************************************************************************/
const Login = () => {
  const isDesktop = useMediaQuery("(min-width: 750px)");
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLoading, isSuccess, error } = useAppSelector((state) => state.auth);

  const handleLogin = ({ email, password }: IAuthForm) => {
    const values: IAuthInput = {
      authType: "LOGIN",
      email,
      password,
    };
    dispatch(asyncAuth(values));
  };

  // Toggle
  const handleToggleDialogState = () => {
    dispatch(clearErrorAndLoadingState());
  };

  const handleNavigateToHomePage = () => {
    router.push("/");
  };

  if (isSuccess) {
    dispatch(clearErrorAndLoadingState());

    return router.push("/");
  }

  return (
    <BlankLayout title="Login page">
      <>
        <MyDialog
          isShow={error ? true : false}
          type="MODAL"
          title={error ? error.error : ""}
          description={
            error
              ? Array.isArray(error.message)
                ? error.message.join()
                : error.message
              : "-"
          }
          toggleDialogState={handleToggleDialogState}
        />

        <Box
          sx={{
            width: "100%",
            height: "100vh",
          }}
        >
          <Grid container>
            {isDesktop && (
              <Grid item md={5}>
                <LeftSide />
              </Grid>
            )}

            <Grid item xs={12} md={7}>
              <RightSide
                isLoading={isLoading}
                isSuccess={isSuccess}
                handleLogin={handleLogin}
                navigateToHomePage={handleNavigateToHomePage}
              />
            </Grid>
          </Grid>
        </Box>
      </>
    </BlankLayout>
  );
};

export default Login;
