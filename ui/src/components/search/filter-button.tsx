import useTranslation from "next-translate/useTranslation";

// Components
import { Box, IconButton, Typography } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";

interface IProps {
  totalProduct: number;
  handleToggleShowFilterResule: () => void;
}

/***********************************************************************************
 *                         -----   MAIN FUNCTION   -----                           *
 **********************************************************************************/
export default function FilterButton({ handleToggleShowFilterResule }: IProps) {
  const { t } = useTranslation("search");

  return (
    <Box
      sx={{
        width: "100%",
        marginTop: "2.5rem",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <IconButton onClick={handleToggleShowFilterResule}>
        <FilterListIcon fontSize="large" />

        <Typography variant="h5" sx={{ marginLeft: "1rem" }}>
          {t("filterResult.title")}
        </Typography>
      </IconButton>
    </Box>
  );
}
