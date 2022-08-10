import React, { ChangeEvent, useState } from "react";

// Material Design
import { Box, Grid, Switch, Typography } from "@mui/material";

interface IProps {
  title: string;
  description: string;
  bottomDivider: boolean;
  darkMode: boolean;
}

/***********************************************************************************
 *                          ---   MAIN FUNCTION   ---                              *
 **********************************************************************************/
export default function NotifyItem({
  title,
  description,
  bottomDivider,
  darkMode,
}: IProps) {
  const [select, setSelect] = useState<boolean>(true);

  const handleOnSelectChange = (_: ChangeEvent<HTMLInputElement>) => {
    setSelect(!select);
  };

  return (
    <Grid item xs={12}>
      <Box
        sx={{
          display: "flex",
          borderBottom: bottomDivider
            ? darkMode
              ? "1px solid #f0eded21"
              : "1px solid #01010122"
            : null,
          pb: "2rem",
          mb: bottomDivider ? "2rem" : 0,
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="subtitle1">{title}</Typography>
          <Typography variant="subtitle2">{description}</Typography>
        </Box>

        <Switch checked={select} onChange={handleOnSelectChange} />
      </Box>
    </Grid>
  );
}
