import React from "react";
import { useRouter } from "next/router";

import { Box, Typography } from "@mui/material";

// Components
import TextButton from "@/components/shares/navigates/desktop/text-button";

/***********************************************************************************
 *                          ---   MAIN FUNCTION   ---                              *
 **********************************************************************************/
const AuthMenu = () => {
  const router = useRouter();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginX: "1rem",
        marginLeft: "1.5rem",
      }}
    >
      <TextButton label={`Log In`} OnClick={() => router.push("/auth/login")} />

      <Typography
        variant="h5"
        sx={{
          p: 1,
          color: "rgba(255, 255, 255, 0.898)",
          fontWeight: "100",
          fontFamily: "PromptLight",
        }}
      >
        |
      </Typography>

      <TextButton
        label={`Sign Up`}
        OnClick={() => router.push("/auth/signup")}
      />
    </Box>
  );
};

export default AuthMenu;
