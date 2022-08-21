import { Grid } from "@mui/material";
import React, { ReactNode } from "react";

interface IProps {
  visible: boolean;
  children: ReactNode;
}

/***********************************************************************************
 *                         -----   MAIN FUNCTION   -----                           *
 **********************************************************************************/
export default function ScreenSize({ visible, children }: IProps) {
  return (
    <>
      {visible ? (
        <Grid item xs={12} md={12} lg={9}>
          {children}
        </Grid>
      ) : (
        <Grid item xs={12}>
          {children}
        </Grid>
      )}
    </>
  );
}
