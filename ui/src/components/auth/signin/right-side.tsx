import React from "react";

// Materials components
import { Box, Typography } from "@mui/material";

// Animate effects
import { motion } from "framer-motion";
import AuthForm from "@/components/auth/auth-form";
import { clPrimary } from "@/features/const/colors";

type Props = {};

const RightSide = (props: Props) => {
  return (
    <Box
      sx={{
        position: "relative",
        height: "100vh",
        width: "100%",
        // bgcolor: "#fdfeff",
        p: 2,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: "65%",
        }}
      >
        <Typography
          sx={{
            mt: 2,
            // ":hover": {
            //   cursor: "pointer",
            // },
            // color: clPrimary,
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

        <AuthForm authType="SIGNIN" />
      </Box>
    </Box>
  );
};

export default RightSide;
