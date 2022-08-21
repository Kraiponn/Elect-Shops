import React from "react";
import { useRouter } from "next/router";

import { Box, Typography } from "@mui/material";

// Components
import TextButton from "@/components/shares/navigates/desktop/text-button";

interface IProps {
  login: string;
  signup: string;
}

/***********************************************************************************
 *                          ---   MAIN FUNCTION   ---                              *
 **********************************************************************************/
const AuthMenu = ({ login, signup }: IProps) => {
  const router = useRouter();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "baseline",
        marginX: "1rem",
        marginLeft: "1.5rem",
      }}
    >
      <TextButton
        label={login}
        OnClick={() =>
          router.push("/auth/login", "/auth/login", { locale: router.locale })
        }
      />

      <Typography variant="h5" sx={{ p: 1 }}>
        |
      </Typography>

      <TextButton
        label={signup}
        OnClick={() =>
          router.push("/auth/signup", "/auth/signup", { locale: router.locale })
        }
      />
    </Box>
  );
};

export default AuthMenu;
