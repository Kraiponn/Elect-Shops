import React from "react";
import useTranslation from "next-translate/useTranslation";

// Material Design
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

// Types and Colors system
import { clDarkMedium, clWhite } from "@/features/const/colors";

// Currency Format - Thai
import { ThaiCurrencyFormatWithBuildIn } from "@/features/services";

interface IProps {
  darkMode: boolean;
}

const invoiceHistoryDMData = [
  {
    date: "2 July 2022",
    total: ThaiCurrencyFormatWithBuildIn(950),
  },
  {
    date: "3 July 2022",
    total: ThaiCurrencyFormatWithBuildIn(1200),
  },
  {
    date: "10 July 2022",
    total: ThaiCurrencyFormatWithBuildIn(450),
  },
];

const TRANSLATE_KEY = "content.generalMenu.account";

/***********************************************************************************
 *                          ---   MAIN FUNCTION   ---                              *
 **********************************************************************************/
export default function InvoiceHistory({ darkMode }: IProps) {
  const { t } = useTranslation("dashboard");

  return (
    <Box
      sx={{
        padding: "2rem",
        my: "3rem",
        background: darkMode ? clDarkMedium : clWhite,
        borderRadius: "0.35rem",
        boxShadow: "0 0 0.25rem #0101012d",
      }}
    >
      <Box sx={{ width: "100%" }}>
        <Typography
          sx={{
            fontSize: "1.35rem",
            fontWeight: 500,
            mb: "1.5rem",
          }}
        >
          {t(`${TRANSLATE_KEY}.billing.InvoiceHistoryTitle`)}
        </Typography>

        <Table sx={{ minWidth: 650 }} aria-label="invoice history table">
          <TableHead>
            <TableRow sx={{ background: darkMode ? "#d3cbcb18" : "#0ffefa1d" }}>
              <TableCell>{t(`${TRANSLATE_KEY}.billing.ivTbDate`)}</TableCell>
              <TableCell align="left">
                {t(`${TRANSLATE_KEY}.billing.ivTbTotal`)}
              </TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoiceHistoryDMData.map((invoice, index) => (
              <TableRow
                key={index}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  fontWeight: 500,
                }}
              >
                <TableCell
                  component="th"
                  align="left"
                  scope="row"
                  sx={{ fontWeight: 400 }}
                >
                  {invoice.date}
                </TableCell>
                <TableCell align="left" sx={{ fontWeight: 400 }}>
                  {invoice.total}
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant="text"
                    sx={{ fontWeight: 500, fontSize: "1rem" }}
                  >
                    {t(`${TRANSLATE_KEY}.billing.evTbView`)}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
}
