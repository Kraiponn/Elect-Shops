// Material design
import { Box, Button, Typography } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";

// Types
import { IErorrResponseData } from "@/features/types";

interface IProps {
  errorObject: IErorrResponseData;
  handleRefreshPage: () => void;
}

/***********************************************
 *                MAIN METHOD                  *
 **********************************************/
const ErrorPage = ({ errorObject, handleRefreshPage }: IProps) => {
  const handleReloadPage = () => {
    handleRefreshPage();
  };
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
      <Box sx={{ width: { xs: "90%", md: "70%", xl: "50%" } }}>
        <Box
          sx={{
            width: "100%",
            background: "rgb(255, 0, 0)",
            color: "rgb(251, 247, 247)",
            padding: "2rem",
            borderRadius: "0.5rem",
            boxShadow: "0 0 .5rem -0.1rem black",
            textAlign: "center",
          }}
        >
          <ErrorIcon sx={{ fontSize: "5rem" }} />
          <Typography sx={{ fontSize: "2rem", fontFamily: "Itim" }}>
            {errorObject.error} : {errorObject.statusCode}
          </Typography>

          <Typography
            sx={{ fontSize: "1rem", fontFamily: "PromptRegular", mt: 3 }}
          >
            {errorObject.message} - Please check the network connection.
          </Typography>
        </Box>

        <Box sx={{ textAlign: "right", mt: 2 }}>
          <Button
            sx={{ fontSize: "1.5rem", fontWeight: 900 }}
            onClick={handleReloadPage}
          >
            Click here to Reload
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ErrorPage;
