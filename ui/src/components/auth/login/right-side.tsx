import React from "react";

// Materials components
import { Box, Typography } from "@mui/material";

// Global state
import {
  useAppSelector,
  useAppDispatch,
} from "@/features/hooks/use-global-state";
import {
  asyncSignup,
  clearErrorAndLoadingState,
} from "@/features/global-state/reducers/auth";
import { IAuthForm } from "@/features/types";

// Animate effects
import { motion } from "framer-motion";

// Components
import AuthForm from "@/components/auth/auth-form";

/****************************************************
 *                MAIN FUNCTION
 */
const RightSide = () => {
  const dispatch = useAppDispatch();
  const { isLoading, isSuccess, user, error } = useAppSelector(
    (state) => state.auth
  );

  const handleLogin = (body: IAuthForm) => {
    dispatch(asyncSignup(body));
  };

  // Toggle
  const handleToggleDialogState = () => {
    dispatch(clearErrorAndLoadingState());
  };

  return (
    <Box
      sx={{
        position: "relative",
        height: "100vh",
        width: "100%",
        p: 2,
      }}
    >
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
          {`SignIn`}
        </Typography>

        <AuthForm
          authType="LOGIN"
          signupNewMember={handleLogin}
          isLoading={isLoading}
          isSuccess={isSuccess}
        />
      </Box>
    </Box>
  );
};

export default RightSide;
