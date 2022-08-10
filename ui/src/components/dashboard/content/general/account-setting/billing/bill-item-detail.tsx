import React from "react";

// Material Design
import { Grid, Typography } from "@mui/material";

interface IProps {
  title: string;
  description: string;
}

/***********************************************************************************
 *                          ---   MAIN FUNCTION   ---                              *
 **********************************************************************************/
export default function BillItemDetail({ title, description }: IProps) {
  return (
    <>
      <Grid
        container
        sx={{
          width: "100%",
          padding: "0.5rem",
        }}
      >
        <Grid item xs={4}>
          <Typography
            sx={{
              fontSize: "1rem",
              fontWeight: 500,
              // width: "200px",
            }}
          >
            {title}
          </Typography>
        </Grid>

        <Grid item xs={8}>
          <Typography
            sx={{
              fontSize: "1rem",
              fontWeight: 400,
              ml: "3rem",
            }}
          >
            {description}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}
