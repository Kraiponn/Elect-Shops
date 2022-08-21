import React from "react";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";

// Material design
import { Breadcrumbs, Box, Typography } from "@mui/material";

interface IProps {
  currentBreadcrumb: string;
}

/***********************************************************************************
 *                          ---  MAIN FUNCTION   ---                               *
 **********************************************************************************/
const TopBreadcrumbs = ({ currentBreadcrumb }: IProps) => {
  const { t } = useTranslation("product-detail");

  function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
  }

  return (
    <Box role="presentation" onClick={handleClick} sx={{ marginY: "0.75rem" }}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link href="/" passHref>
          <a>
            <Typography
              sx={{
                fontFamily: "Prompt",
                fontSize: "1.2rem",
                fontWeight: 500,
              }}
            >
              {t("breadcrumb.home")}
            </Typography>
          </a>
        </Link>

        <Link href="/search" passHref>
          <a>
            <Typography
              sx={{
                fontFamily: "Prompt",
                fontSize: "1.2rem",
                fontWeight: 500,
              }}
            >
              {t("breadcrumb.product")}
            </Typography>
          </a>
        </Link>

        <Typography
          sx={{
            fontFamily: "Prompt",
            fontSize: "1.2rem",
            fontWeight: "900",
            fontStyle: "italic",
          }}
        >
          {currentBreadcrumb}
        </Typography>
      </Breadcrumbs>
    </Box>
  );
};

export default TopBreadcrumbs;
