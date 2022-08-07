import React, { useState } from "react";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";

// Material design
import {
  Box,
  TextField,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import DefautLayout from "@/components/shares/layouts/defaut-layout";

/***********************************************
 *               MAIN METHOD
 **********************************************/
const ProductPage = () => {
  const router = useRouter();
  const { t, lang } = useTranslation();

  return (
    <DefautLayout title="product page" description="welcome to shoping">
      <Box
        sx={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: "50%",
          height: "200px",
        }}
      >
        <Typography variant="h3">Welcome back, {t("product:title")}</Typography>
        <Typography variant="body2">{t("product:description")}</Typography>
      </Box>
    </DefautLayout>
  );
};

export default ProductPage;
