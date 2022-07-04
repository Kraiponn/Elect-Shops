import React, { useEffect } from "react";
import { useRouter } from "next/router";

// Materials components
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

// Global state
import {
  useAppSelector,
  useAppDispatch,
} from "@/features/hooks/use-global-state";
import {
  asyncAuth,
  clearErrorAndLoadingState,
} from "@/features/global-state/reducers/auth";
import { IAuthForm, IAuthInput } from "@/features/types";

// Animate effects
import { motion } from "framer-motion";

// Components
import AuthForm from "@/components/auth/auth-form";
import MyDialog from "@/components/shares/loader/my-dialog";

/****************************************************
 *                MAIN FUNCTION
 */
const RightSide = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLoading, isSuccess, user, error } = useAppSelector(
    (state) => state.auth
  );

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

  useEffect(() => {
    // Switch to the home page
    if (isSuccess) {
      dispatch(clearErrorAndLoadingState());

      router.push("/");
    }
  });

  return (
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
          position: "relative",
          height: "100vh",
          width: "100%",
          p: 2,
        }}
      >
        <Tooltip title={`home page`} placement="bottom" arrow>
          <IconButton
            sx={{
              position: "absolute",
              right: 0,
              top: 0,
              padding: "2rem",
            }}
            // size="small"
            color="inherit"
            onClick={() => router.push("/")}
          >
            <HomeIcon fontSize="large" color="inherit" />
          </IconButton>
        </Tooltip>

        <Box
          sx={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "70%", md: "55%" },
          }}
        >
          <Typography
            sx={{
              mt: 2,
              fontWeight: "900",
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
          >
            {`Log In`}
          </Typography>

          <AuthForm
            authType="LOGIN"
            handleAuth={handleLogin}
            isLoading={isLoading}
            isSuccess={isSuccess}
          />
        </Box>
      </Box>
    </>
  );
};

export default RightSide;
