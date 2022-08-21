import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";

// Materials
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";

// Global state and Types
import {
  useAppSelector,
  useAppDispatch,
} from "@/features/hooks/use-global-state";
import {
  asyncAuth,
  clearErrorAndLoadingState,
  setAuthSuccess,
} from "@/features/global-state/reducers/auth";
import { clearStateWithoutProducts } from "@/features/global-state/reducers/product";
import { IAuthForm, IAuthInput } from "@/features/interfaces";

// Components
import DefaultLayout from "@/components/shares/layouts/defaut-layout";
import AuthForm from "@/components/auth/auth-form";
import MyDialog from "@/components/shares/loader/my-dialog";
import Cookies from "js-cookie";
import { clDarkHard, clDarkMedium, clWhite } from "@/features/const/colors";

/***********************************************************************************
 *                          ---   MAIN FUNCTION   ---                              *
 **********************************************************************************/
const SignUp = () => {
  const [finish, setFinish] = useState<boolean>(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { t } = useTranslation("signup");
  const { darkMode } = useAppSelector((state) => state.gui);
  const { isLoading, isSuccess, error, user, access_token } = useAppSelector(
    (state) => state.auth
  );

  //#########################################
  //           Life cycle method
  //#########################################
  useEffect(() => {
    return () => {
      dispatch(clearStateWithoutProducts());
    };
  }, [dispatch]);

  const handleSignup = ({ email, password }: IAuthForm) => {
    const values: IAuthInput = {
      authType: "SIGNUP",
      email,
      password,
    };

    dispatch(asyncAuth(values));
  };

  // Toggle error modal
  const handleToggleDialogState = () => {
    dispatch(clearErrorAndLoadingState());
  };

  // Keep user and access_token to global state
  if (!user && !access_token) {
    const _user = Cookies.get("user");
    const _accessToken = Cookies.get("access_token");

    if (_user && _accessToken) {
      dispatch(
        setAuthSuccess({ user: JSON.parse(_user), access_token: _accessToken })
      );
    }
  } else if (isSuccess) {
    return router.push("/auth/success", "/auth/success", {
      locale: router.locale,
    });
  }

  return (
    <DefaultLayout title="content" description="signup page">
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
            minHeight: "100vh",
            position: "relative",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              height: "50%",
              background: darkMode ? clDarkHard : "rgb(26, 184, 171)",
              borderTopLeftRadius: "1rem",
              borderTopRightRadius: "1rem",
            }}
          ></Box>

          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              // zIndex: 2,
              transform: "translate(-50%, -50%)",
              width: { xs: "80%", md: "60%", lg: "45%" },
              background: darkMode ? clDarkMedium : clWhite,
              borderRadius: "10px",
              boxShadow: "0 0 0.5rem rgba(0, 0, 0, 0.212)",
              padding: "2rem",
            }}
          >
            <Typography
              sx={{
                mt: 2,
                fontWeight: "900",
                fontSize: { xs: "1.5rem", md: "1.75rem", lg: "2.3rem" },
                textAlign: "center",
                marginBottom: "5rem",
              }}
              variant="h2"
              component={motion.div}
              initial={{ y: 0, opacity: 0 }}
              animate={{ y: [50, -50, 0], opacity: 1 }}
              exit={{ x: 0 }}
              transition={{
                dealy: 1,
                ease: "linear",
                duration: 1,
              }}
              onClick={() => setFinish(!finish)}
            >
              {t("title")}
            </Typography>

            <AuthForm
              authType="SIGNUP"
              handleAuth={handleSignup}
              isLoading={isLoading}
              isSuccess={isSuccess}
            />
          </Box>
        </Box>
      </>
    </DefaultLayout>
  );
};

export default SignUp;
