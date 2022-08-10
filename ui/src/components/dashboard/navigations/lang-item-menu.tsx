import React from "react";
import Image from "next/image";

// Material Design
import { Box, IconButton } from "@mui/material";
import { localeType } from "@/features/interfaces";

// COMPONENTS
import ThaiFlag from "@/assets/images/flag-thailand.png";
import UsaFlag from "@/assets/images/flag-usa.png";

interface IProps {
  locale: localeType;
  handleChangeMode: () => void;
}

/***********************************************************************************
 *                          ---   MAIN FUNCTION   ---                              *
 **********************************************************************************/
export default function LangItemMenu({ locale, handleChangeMode }: IProps) {
  return (
    <IconButton onClick={handleChangeMode}>
      <Box sx={{ position: "relative", width: "25px", height: "25px" }}>
        <Image
          src={locale === "en-US" ? UsaFlag : ThaiFlag}
          alt="app lang"
          layout="fill"
          objectFit="contain"
        />
      </Box>
    </IconButton>
  );
}
