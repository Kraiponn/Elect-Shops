import React, { ChangeEvent, FormEvent } from "react";
import useTranslation from "next-translate/useTranslation";

// Material design
import { Box, Button, Divider, Stack, TextField } from "@mui/material";

// Components
import CustomAccordion from "@/components/search/filter/custom-accordion";

interface IProps {
  darkMode: boolean;
  minPrice: number;
  maxPrice: number;
  handleSubmitFilterProduct: (e: FormEvent<HTMLFormElement>) => void;
  handleInputMinMaxPriceChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

/***********************************************************************************
 *                         -----   MAIN FUNCTION   -----                           *
 **********************************************************************************/
export default function PriceRageFilter({
  darkMode,
  minPrice,
  maxPrice,
  handleSubmitFilterProduct,
  handleInputMinMaxPriceChange,
}: IProps) {
  const { t } = useTranslation("search");

  return (
    <CustomAccordion title={t("filterResult.priceRange")} darkMode={darkMode}>
      <>
        <form onSubmit={handleSubmitFilterProduct}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
            }}
          >
            <Stack
              direction="row"
              divider={<Divider orientation="vertical" flexItem />}
              spacing={2}
            >
              <TextField
                type="number"
                size="small"
                placeholder="min"
                name="minPrice"
                value={minPrice}
                onChange={handleInputMinMaxPriceChange}
              />
              <TextField
                type="number"
                size="small"
                placeholder="max"
                name="maxPrice"
                value={maxPrice}
                onChange={handleInputMinMaxPriceChange}
              />
            </Stack>

            <Button sx={{ mt: 1 }} variant="contained" type="submit">
              {t("filterResult.applyButton")}
            </Button>
          </Box>
        </form>
      </>
    </CustomAccordion>
  );
}
