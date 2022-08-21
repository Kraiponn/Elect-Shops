import useTranslation from "next-translate/useTranslation";

// Global state
import { clSecondary } from "@/features/const/colors";

// Components
import { Box, Typography } from "@mui/material";

interface IProps {
  totalProduct: number;
  keyword: string;
}

/***********************************************************************************
 *                                MAIN FUNCTION                                    *
 **********************************************************************************/
export default function TitleProductCount({ totalProduct, keyword }: IProps) {
  const { t } = useTranslation("search");

  return (
    <Box sx={{ marginBottom: "2rem" }}>
      <Typography variant="h2" component="span">
        {t("title", { quantity: totalProduct })}
      </Typography>

      <Typography
        variant="h2"
        sx={{
          color: clSecondary,
        }}
        component="span"
      >
        {t("subtitle", { keyword: keyword ? keyword : "*" })}
      </Typography>
    </Box>
  );
}
