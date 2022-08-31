import React, { useEffect } from "react";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";

// Material design
import { Box, Button, Typography } from "@mui/material";

// Global state and System colors
import {
  useAppDispatch,
  useAppSelector,
} from "@/features/hooks/use-global-state";
import { clearOrderState } from "@/features/global-state/reducers/order";
import { clearProductCart } from "@/features/global-state/reducers/product";

/***********************************************************************************
 *                          ---  MAIN FUNCTION   ---                               *
 **********************************************************************************/
export default function Order() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { t } = useTranslation("order-success");
  const { isSuccess } = useAppSelector((state) => state.order);

  const handleNavigateToHomePage = () => {
    router.push("/", "/", { locale: router.locale });
  };

  //############################################
  //             LIFE CYCLE METHOD
  //############################################
  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(clearOrderState());
        dispatch(clearProductCart());
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="h1" component="h1">
          {t("title")}
        </Typography>

        <Button
          variant="contained"
          onClick={handleNavigateToHomePage}
          sx={{
            padding: "1rem",
            mt: "2rem",
            fontSize: "1.2rem",
            boxShadow: "0 0 0.5rem #01010189",
          }}
        >
          {t("textButton")}
        </Button>
      </Box>
    </Box>
  );
}
