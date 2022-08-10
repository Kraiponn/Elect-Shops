import React from "react";
import useTranslation from "next-translate/useTranslation";

// Material Design
import { Box, Typography } from "@mui/material";

// Components
import InvoiceHistory from "@/components/dashboard/content/general/account-setting/billing/invoice-history";
import BillingListItem from "@/components/dashboard/content/general/account-setting/billing/bill-list-item";

interface IProps {
  darkMode: boolean;
}

const TRANSLATE_KEY = "content.generalMenu.account";

/***********************************************************************************
 *                          ---   MAIN FUNCTION   ---                              *
 **********************************************************************************/
export default function Billing({ darkMode }: IProps) {
  const { t } = useTranslation("dashboard");

  return (
    <Box sx={{ height: "100%" }}>
      <Typography
        variant="h3"
        sx={{
          my: "2rem",
        }}
      >
        {t(`${TRANSLATE_KEY}.billing.title`)}
      </Typography>

      <BillingListItem darkMode={darkMode} />
      <InvoiceHistory darkMode={darkMode} />
    </Box>
  );
}
