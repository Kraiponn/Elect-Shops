import React from "react";
import useTranslation from "next-translate/useTranslation";

// Materials
import { Box, Typography } from "@mui/material";

import { motion } from "framer-motion";

// Components
import DefaultLayout from "@/components/shares/layouts/default-layout";
import ForgotPasswordForm from "@/components/auth/forgot-password-form";

/***********************************************************************************
 *                          ---   MAIN FUNCTION   ---                              *
 **********************************************************************************/
const ForgotPassword = () => {
  const { t } = useTranslation("common");

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
            width: { xs: "70%", md: "50%" },
          }}
        >
          <Typography
            sx={{
              mt: 2,
              fontWeight: "900",
              textAlign: "center",
              marginBottom: "2rem",
            }}
            variant="h3"
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
            {t("auth.forgotPassword.title")}
          </Typography>

          <ForgotPasswordForm
            textSubmitButton={t("auth.submitButton")}
            pwdRequire={t("auth.pwdRequire")}
            pwdMinLength={t("auth.pwdMinChars")}
          />
        </Box>
      </Box>
    </DefaultLayout>
  );
};

export default ForgotPassword;
