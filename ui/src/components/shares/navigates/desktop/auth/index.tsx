import React from "react";
import { useRouter } from "next/router";

import { Box, Typography } from "@mui/material";

// Components
import TextButton from "@/components/shares/navigates/desktop/text-button";


interface IProps {}

/***********************************************
 *                MAIN METHOD                  *
 **********************************************/
const AuthMenu = ({}: IProps) => {
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

      <Typography variant="h5" sx={{ p: 1 }}>
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
