import React, { useEffect } from "react";
import { useRouter } from "next/router";

// Materials
import { Box, Typography } from "@mui/material";

// Global state
import {
  useAppSelector,
  useAppDispatch,
} from "@/features/hooks/use-global-state";
import { clearErrorAndLoadingState } from "@/features/global-state/reducers/auth";

// Components
import DefaultLayout from "@/components/shares/layouts/default-layout";

/***********************************************************************************
 *                          ---   MAIN FUNCTION   ---                              *
 **********************************************************************************/
const SignupSuccess = () => {
  const router = useRouter();
  const { isSuccess } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isSuccess) {
      router.push("/auth/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  const goToLoginPage = () => {
    dispatch(clearErrorAndLoadingState());
    router.push("/auth/login");
  };

  return (
    <DefaultLayout title="success">
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "70%", md: "auto" },
          }}
        >
          <Typography
            sx={{
              mt: 2,
              textAlign: "center",
              marginBottom: "5rem",
            }}
            variant="h4"
          >
            {`Signup is successfully, Please signin to join us.`}
          </Typography>

          <Typography
            variant="h5"
            sx={{
              cursor: "pointer",
              color: "red",
              textDecoration: "underline",
              textAlign: "right",
            }}
            onClick={goToLoginPage}
          >
            {`Login here`}
          </Typography>
        </Box>
      </Box>
    </DefaultLayout>
  );
};

export default SignupSuccess;
