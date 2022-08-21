import React from "react";
import Image from "next/image";
import useTranslation from "next-translate/useTranslation";

// Material components & Icons
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LockIcon from "@mui/icons-material/Lock";

// Global state and System colors
import { useAppSelector } from "@/features/hooks/use-global-state";
import { clDarkHard, clPrimary, clWhite } from "@/features/const/colors";

// Components
import {
  CardMaster,
  CardVisa,
  CardPaypal,
} from "@/components/product/checkout/util";
import { ThaiCurrencyFormatWithBuildIn } from "@/features/services";

interface IProps {}

/***********************************************************************************
 *                          ---  MAIN FUNCTION   ---                               *
 **********************************************************************************/
export default function Summary({}: IProps) {
  const { t } = useTranslation("checkout");
  const { darkMode } = useAppSelector((state) => state.gui);
  const { orders, totalPrice } = useAppSelector((state) => state.product);

  return (
    <Grid item xs={12} lg={5}>
      <Box sx={{ width: "100%", mb: "3rem", pl: "3.5rem", pr: "2rem" }}>
        <Typography variant="h2" sx={{ fontWeight: 900 }}>
          {t("summary")}
        </Typography>

        {/************* ORIGINAL PRICE **************/}
        <Box
          sx={{
            width: "100%",
            mt: "2rem",
            pb: "1rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="body1">{t("price")}</Typography>
          <Typography variant="body1">
            {ThaiCurrencyFormatWithBuildIn(totalPrice)}
          </Typography>
        </Box>

        {/************* DELIVERY CHARGE **************/}
        <Box
          sx={{
            width: "100%",
            mb: "1rem",
            pb: "1rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: darkMode
              ? "0.02rem solid rgba(255, 255, 255, 0.078)"
              : "0.02rem solid rgba(1, 1, 1, 0.078)",
          }}
        >
          <Typography variant="body1">{t("delivery")}</Typography>
          <Typography variant="body1">
            {ThaiCurrencyFormatWithBuildIn(40)}
          </Typography>
        </Box>

        {/************* TOTAL **************/}
        <Box
          sx={{
            width: "100%",
            mb: "1rem",
            pb: "1rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: darkMode
              ? "0.02rem solid rgba(255, 255, 255, 0.078)"
              : "0.02rem solid rgba(1, 1, 1, 0.078)",
          }}
        >
          <Typography variant="h5">{t("total")}</Typography>
          <Typography variant="h5">
            {ThaiCurrencyFormatWithBuildIn(totalPrice + 40)}
          </Typography>
        </Box>

        {/************* REMARK **************/}
        <Box
          sx={{
            width: "100%",
            mt: "1.5rem",
            mb: "0.5rem",
          }}
        >
          <Typography
            component="span"
            variant="body2"
            sx={{ fontSize: "0.789rem" }}
          >
            {t("remark1")}
          </Typography>
          <Typography
            variant="subtitle1"
            component="span"
            sx={{
              fontSize: "0.789rem",
              color: clPrimary,
              ml: "3px",
              "&:hover": {
                transform: "scaleY(1.1)",
                cursor: "pointer",
                fontWeight: 700,
              },
            }}
          >
            {t("remark2")}
          </Typography>
        </Box>

        {/************* CHECKOUT BUTTON **************/}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ py: "1rem", fontSize: "1.2rem" }}
        >
          {t("button")}
        </Button>

        <Typography
          component="h5"
          variant="body2"
          sx={{ fontSize: "0.789rem", textAlign: "center", mt: "1rem" }}
        >
          {t("remark3")}
        </Typography>
      </Box>
    </Grid>
  );
}
