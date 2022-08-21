import React, { ReactNode, useState } from "react";

// Components
import { Box, Button, Collapse, Typography } from "@mui/material";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface IProps {
  title: string;
  darkMode: boolean;
  children: ReactNode;
}

/***********************************************************************************
 *                         -----   MAIN FUNCTION   -----                           *
 **********************************************************************************/
export default function CustomAccordion({ title, darkMode, children }: IProps) {
  const [expand, setExpand] = useState<boolean>(false);

  const handleOnChangeExpand = () => {
    setExpand(!expand);
  };

  return (
    <Box
      sx={{
        width: "100%",
        pb: "1rem",
        mb: "1rem",
        borderBottom: darkMode
          ? "2px solid rgba(255, 255, 255, 0.103)"
          : "2px solid rgba(1, 1, 1, 0.103)",
      }}
    >
      {/************* Ratings filter *************/}
      <Button
        onClick={handleOnChangeExpand}
        disableRipple
        disableFocusRipple
        disableElevation
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          color: darkMode
            ? "rgba(255, 255, 255, 0.812)"
            : "rgba(0, 0, 0, 0.573)",
          "&:hover": {
            background: "transparent",
          },
        }}
      >
        <Typography variant="h5">{title}</Typography>

        {expand ? (
          <ExpandLessIcon fontSize="large" color="inherit" />
        ) : (
          <ExpandMoreIcon fontSize="large" color="inherit" />
        )}
      </Button>

      <Collapse
        orientation="vertical"
        in={expand}
        sx={{ mb: expand ? "1rem" : 0 }}
      >
        {children}
      </Collapse>
    </Box>
  );
}
