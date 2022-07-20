import React from "react";
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

interface IProps {
  isLoading: boolean;
  isSuccess: boolean;
  handleLogin: ({ email, password }: IAuthForm) => void;
  navigateToHomePage: () => void;
}

/****************************************************
 *                  MAIN FUNCTION
 ***************************************************/
const RightSide = ({
  isLoading,
  isSuccess,
  handleLogin,
  navigateToHomePage,
}: IProps) => {
  return (
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
          onClick={navigateToHomePage}
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
  );
};

export default RightSide;
