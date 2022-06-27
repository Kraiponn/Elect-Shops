import React from "react";

import { Box } from "@mui/material";

type Props = {};

const Backdrop = (props: Props) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        position: "absolute",
        left: 0,
        top: 0,
        zIndex: 100,
        background: "rgba(0, 0, 0, 0.7)",
      }}
    ></Box>
  );
};

export default Backdrop;
