import React from "react";

// Materials
import { Box, Typography, useMediaQuery } from "@mui/material";

import { motion } from "framer-motion";

// Components
import DefaultLayout from "@/components/shares/layouts/defaut-layout";
import AuthForm from "@/components/auth/auth-form";

/****************************************************
 *  MAIN FUNCTION
 */
const SignUp = () => {
  const isDesktop = useMediaQuery("(min-width: 900px)");

  return (
    <DefaultLayout title="signup page">
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
            width: "60%",
          }}
        >
          <Typography
            sx={{
              mt: 2,
              color: "black",
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
            {`Signup to Join Us`}
          </Typography>

          <AuthForm authType="SIGNUP" />
        </Box>
      </Box>
    </DefaultLayout>
  );
};

export default SignUp;
