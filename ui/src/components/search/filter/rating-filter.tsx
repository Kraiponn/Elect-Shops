import useTranslation from "next-translate/useTranslation";

// Components
import {
  Box,
  FormControlLabel,
  Radio,
  RadioGroup,
  Rating,
  Typography,
} from "@mui/material";

// Components
import CustomAccordion from "@/components/search/filter/custom-accordion";

interface IProps {
  darkMode: boolean;
}

/***********************************************************************************
 *                         -----   MAIN FUNCTION   -----                           *
 **********************************************************************************/
export default function RatingFilter({ darkMode }: IProps) {
  const { t } = useTranslation("search");

  return (
    <CustomAccordion title={t("filterResult.rating")} darkMode={darkMode}>
      <RadioGroup name="product-rating" defaultValue={4.5}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <FormControlLabel
            sx={{ margin: 0, padding: 0 }}
            value={4.5}
            control={<Radio sx={{ margin: "5px", padding: 0 }} />}
            label=""
          />
          <Rating
            sx={{ marginLeft: "0", marginRight: "0.25rem" }}
            value={4.5}
            precision={0.5}
          />
          <Typography sx={{ fontWeight: 400, fontSize: "1rem" }}>
            {t("filterResult.up", { ratings: 4.5 })}
          </Typography>
        </Box>

        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <FormControlLabel
            sx={{ margin: 0, padding: 0 }}
            value={4}
            control={<Radio sx={{ margin: "5px", padding: 0 }} />}
            label=""
          />
          <Rating
            sx={{ marginLeft: "0", marginRight: "0.25rem" }}
            value={4}
            precision={0.5}
          />
          <Typography sx={{ fontWeight: 400, fontSize: "1rem" }}>
            {t("filterResult.up", { ratings: 4 })}
          </Typography>
        </Box>

        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <FormControlLabel
            sx={{ margin: 0, padding: 0 }}
            value={3.5}
            control={<Radio sx={{ margin: "5px", padding: 0 }} />}
            label=""
          />
          <Rating
            sx={{ marginLeft: "0", marginRight: "0.25rem" }}
            value={3.5}
            precision={0.5}
          />
          <Typography sx={{ fontWeight: 400, fontSize: "1rem" }}>
            {t("filterResult.up", { ratings: 3.5 })}
          </Typography>
        </Box>

        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <FormControlLabel
            sx={{ margin: 0, padding: 0 }}
            value={3}
            control={<Radio sx={{ margin: "5px", padding: 0 }} />}
            label=""
          />
          <Rating
            sx={{ marginLeft: "0", marginRight: "0.25rem" }}
            value={3}
            precision={0.5}
          />
          <Typography sx={{ fontWeight: 400, fontSize: "1rem" }}>
            {t("filterResult.up", { ratings: 3 })}
          </Typography>
        </Box>
      </RadioGroup>
    </CustomAccordion>
  );
}
