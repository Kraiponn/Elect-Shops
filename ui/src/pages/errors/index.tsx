import React from "react";

// Material design
import { Alert, Box } from "@mui/material";

// Types
import { IErorrResponseData } from "@/features/types";

// Components
import DefautLayout from "@/components/shares/layouts/defaut-layout";

interface IProps {
  errorObject: IErorrResponseData;
}

/***********************************************
 *                MAIN METHOD                  *
 **********************************************/
const ErrorPage = ({ errorObject }: IProps) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box sx={{ width: "70%" }}>
        <Alert variant="filled" severity="error">
          {errorObject.message}
        </Alert>
      </Box>
    </Box>
  );
};

export default ErrorPage;
