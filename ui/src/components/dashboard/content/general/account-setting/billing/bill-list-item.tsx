import React from "react";
import useTranslation from "next-translate/useTranslation";

// Material Design
import { Box, Button, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

// Types and Colors system
import { clDarkMedium, clGray100, clWhite } from "@/features/const/colors";

// Components
import BillItemDetail from "@/components/dashboard/content/general/account-setting/billing/bill-item-detail";

interface IProps {
  darkMode: boolean;
}

const billDetailDMData = {
  billName: "John Doe",
  cardNo: "**** **** **** 6789",
  country: "Thailand",
  zipCode: 12120,
};

const TRANSLATE_KEY = "content.generalMenu.account";

/***********************************************************************************
 *                          ---   MAIN FUNCTION   ---                              *
 **********************************************************************************/
export default function BillListItem({ darkMode }: IProps) {
  const { t } = useTranslation("dashboard");

  return (
    <Box
      sx={{
        padding: "2rem",
        background: darkMode ? clDarkMedium : clWhite,
        borderRadius: "0.35rem",
        boxShadow: "0 0 0.25rem #0101011d",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
        <Typography
          sx={{
            fontSize: "1.35rem",
            fontWeight: 500,
          }}
        >
          {t(`${TRANSLATE_KEY}.billing.billingDetailTitle`)}
        </Typography>

        <Box sx={{ flexGrow: 1 }}></Box>

        <Button
          variant="text"
          startIcon={<EditIcon />}
          sx={{ fontSize: "1rem" }}
        >
          {t(`${TRANSLATE_KEY}.billing.editTextButton`)}
        </Button>
      </Box>

      <Box
        sx={{
          width: "100%",
          mb: "1rem",
          borderBottom: darkMode
            ? `0.02rem solid ${clGray100}`
            : "0.02rem solid #01010129",
        }}
      ></Box>

      <BillItemDetail
        title={t(`${TRANSLATE_KEY}.billing.billName`)}
        description={billDetailDMData.billName}
      />
      <BillItemDetail
        title={t(`${TRANSLATE_KEY}.billing.cardNumber`)}
        description={billDetailDMData.cardNo}
      />
      <BillItemDetail
        title={t(`${TRANSLATE_KEY}.billing.country`)}
        description={billDetailDMData.country}
      />
      <BillItemDetail
        title={t(`${TRANSLATE_KEY}.billing.zipPostalCode`)}
        description={`${billDetailDMData.zipCode}`}
      />

      <Box
        sx={{
          width: "100%",
          my: "1rem",
          borderBottom: darkMode
            ? `0.02rem solid ${clGray100}`
            : "0.02rem solid #01010129",
        }}
      ></Box>

      <Typography variant="body2" sx={{ fontWeight: 400, fontSize: "0.89rem" }}>
        ** {t(`${TRANSLATE_KEY}.billing.remarkText`)}
      </Typography>
    </Box>
  );
}
