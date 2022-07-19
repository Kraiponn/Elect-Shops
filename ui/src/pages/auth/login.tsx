import React from "react";
import { NextPage } from "next";

// Materials
import { Box, Grid, useMediaQuery } from "@mui/material";

// Components
import BlankLayout from "@/components/shares/layouts/blank-layout";
import LeftSide from "@/components/auth/login/left-side";
import RightSide from "@/components/auth/login/right-side";

/****************************************************
 *  MAIN FUNCTION
 */
const Login: NextPage = () => {
  const isDesktop = useMediaQuery("(min-width: 900px)");

  return (
    <BlankLayout title="Login page">
      <Box
        sx={{
          width: "100%",
          height: "100vh",
        }}
      >
        <Grid container>
          {isDesktop && (
            <Grid item md={5}>
              <LeftSide />
            </Grid>
          )}

          <Grid item xs={12} md={7}>
            <RightSide />
          </Grid>
        </Grid>
      </Box>
    </BlankLayout>
  );
};

export default Login;
