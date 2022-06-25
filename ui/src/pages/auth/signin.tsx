import React from "react";

// Materials
import { Box, Grid, useMediaQuery } from "@mui/material";

// Components
import BlankLayout from "@/components/shares/layouts/blank-layout";
import LeftSide from "@/components/auth/left-side";
import RightSide from "@/components/auth/right-side";

type Props = {};

const SignIn = (props: Props) => {
  const isDesktop = useMediaQuery("(min-width: 900px)");

  return (
    <BlankLayout title="signin page">
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

export default SignIn;
