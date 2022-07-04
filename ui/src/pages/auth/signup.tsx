import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

// Materials
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";

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

// Components
import DefaultLayout from "@/components/shares/layouts/defaut-layout";
import AuthForm from "@/components/auth/auth-form";
import MyDialog from "@/components/shares/loader/my-dialog";

/****************************************************
 *                 MAIN FUNCTION
 */
const SignUp = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLoading, isSuccess, error } = useAppSelector((state) => state.auth);
  const [finish, setFinish] = useState<boolean>(false);

  const handleSignup = ({ email, password }: IAuthForm) => {
    const values: IAuthInput = {
      authType: "SIGNUP",
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
    // Switch to the success page when signup is successfull
    if (isSuccess) {
      router.push("/auth/success");
    }
  });

  return (
    <DefaultLayout title="signup page">
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
            position: "relative",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: { xs: "70%", md: "35%" },
            }}
          >
            <Typography
              sx={{
                mt: 2,
                fontWeight: "900",
                fontSize: { xs: "1.5rem", md: "2rem", lg: "2.5rem" },
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
              {`Signup to Join Us`}
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
