// Material design & Colors system
import { Box, Button, keyframes, Typography } from "@mui/material";
import WarningIcon from "@mui/icons-material/Warning";
import { clWhite } from "@/features/const/colors";

interface IProps {
  type: "ERROR" | "CONFIRM";
  title?: string;
  description?: string;
  isShow: boolean;
  handleResponse: (result: boolean) => void;
}

const animateModal = keyframes`
  0% {
    opacity: 0;
    transform: scale(0) translate(-50%, -50%);
  }
  70% {
    opacity: 0.8;
    transform: scale(1.2)  translate(-50%, -50%);
  }
  100% {
    opacity: 1;
    visibility: visible;
    transform: scale(1)  translate(-50%, -50%);
  }
`;

/***********************************************************************************
 *                          ---   MAIN FUNCTION   ---                              *
 **********************************************************************************/
export default function ConfirmDialog({
  type,
  isShow,
  title = `Remove an account`,
  description = `Are you sure to remove your an account?`,
  handleResponse,
}: IProps) {
  const handleClose = (isConfirm: boolean) => {
    handleResponse(isConfirm);
  };

  return isShow ? (
    <>
      {/*******************    BACKDROP    *********************/}
      <Box
        sx={{
          width: "100%",
          height: "100%",
          position: "fixed",
          left: 0,
          top: 0,
          zIndex: 99999,
          background: "rgba(0, 0, 0, 0.94)",
        }}
        onClick={() => handleClose(false)}
      ></Box>

      {/*******************    MODAL    *********************/}
      <Box
        sx={{
          width: { xs: "90%", md: "50%" },
          padding: "1.5rem",
          background: clWhite,
          position: "fixed",
          top: "50%",
          left: "50%",
          zIndex: "100000",
          transform: "scale(0) translate(-50%, -50%)",
          borderRadius: "0.3rem",
          visibility: "hidden",
          opacity: 0,
          animation: `${animateModal} .35s forwards ease-out`,
        }}
      >
        {/*******************    TITLE    *********************/}
        <Box
          sx={{
            width: "100%",
            borderBottom: "0.03rem solid rgba(1, 1, 1, 0.081)",
            pb: "0.789rem",
            display: "flex",
            alignItems: "center",
          }}
        >
          <WarningIcon
            sx={{ color: "rgb(248, 72, 8)", fontSize: "2rem", mr: "0.5rem" }}
          />
          <Typography variant="h4" component="h3">
            {title}
          </Typography>
        </Box>

        {/*******************    DESCRIPTION    *********************/}
        <Typography
          variant="subtitle2"
          component="p"
          sx={{ mt: "2.5rem", textIndent: "2.5rem" }}
        >
          {description}
        </Typography>

        {/*******************    CANCEL AND OK BUTTON    *********************/}
        <Box
          sx={{
            width: "100%",
            mt: "3rem",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          {type === "CONFIRM" ? (
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => handleClose(false)}
            >
              {`CANCEL`}
            </Button>
          ) : null}
          <Button
            variant="contained"
            onClick={() => handleClose(true)}
            sx={{
              ml: 2,
            }}
          >{`OK`}</Button>
        </Box>
      </Box>
    </>
  ) : null;
}
