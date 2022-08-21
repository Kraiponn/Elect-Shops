import React, { ChangeEvent } from "react";

// Marerial Design
import { Box, Typography } from "@mui/material";

// Global state and Types
import { useAppSelector } from "@/features/hooks/use-global-state";

// Colors system and Types
import {
  clDarkHard,
  clDarkMedium,
  clWhite,
  clWhiteGray,
} from "@/features/const/colors";

interface IProps {
  darkMode: boolean;
  title: string;
  categoryId: number;
  handleOnChangeProductCategory: (e: ChangeEvent<HTMLSelectElement>) => void;
}

/***********************************************************************************
 *                         -----   MAIN FUNCTION   -----                           *
 **********************************************************************************/
export default function ProductCategoryList({
  darkMode,
  title,
  categoryId,
  handleOnChangeProductCategory,
}: IProps) {
  const { categories } = useAppSelector((state) => state.category);

  return (
    <Box sx={{ width: "100%" }}>
      <Typography
        variant="h5"
        sx={{
          mb: "0.5rem",
          color: darkMode
            ? "rgba(255, 255, 255, 0.812)"
            : "rgba(0, 0, 0, 0.573)",
        }}
      >
        {title}
      </Typography>

      <Box
        className="select-wrapper"
        sx={{
          position: "relative",
          color: darkMode ? clWhiteGray : clDarkHard,
          "& :hover": {
            cursor: "pointer",
          },
          "&::after": {
            content: '"▼"',
            position: "absolute",
            top: "0.3rem",
            right: "0.7rem",
            fontSize: "1.3rem",
          },
        }}
      >
        <select
          value={categoryId}
          onChange={handleOnChangeProductCategory}
          style={{
            appearance: "none",
            MozAppearance: "none",
            padding: "0.7rem 0.75rem",
            width: "100%",
            borderRadius: "0.3rem",
            border: "none",
            boxShadow: darkMode
              ? "0 0 0.5rem #ffffff54"
              : "0 0 0.5rem #01010128",
            background: darkMode ? clDarkMedium : clWhite,
            color: darkMode ? clWhiteGray : clDarkHard,
            fontFamily: "Prompt",
          }}
        >
          {categories &&
            categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.category_name}
              </option>
            ))}
        </select>
      </Box>
    </Box>
  );
}
