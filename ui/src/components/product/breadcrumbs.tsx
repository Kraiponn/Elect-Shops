import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { GetServerSideProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";

// Material design
import {
  Breadcrumbs,
  Container,
  Toolbar,
  Box,
  Typography,
} from "@mui/material";

interface IProps {
  currentBreadcrumb: string;
}

/*********************************************************
 *                     MAIN METHOD                       *
 ********************************************************/
const TopBreadcrumbs = ({ currentBreadcrumb }: IProps) => {
  function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
  }

  return (
    <Box role="presentation" onClick={handleClick} sx={{ marginY: "1rem" }}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link href="/" passHref>
          <a>
            <Typography
              sx={{
                fontFamily: "PromptRegular",
                fontSize: "1.2rem",
                color: "rgb(1,1,1)",
              }}
            >{`Home`}</Typography>
          </a>
        </Link>

        <Link href="/products" passHref>
          <a>
            <Typography
              sx={{
                fontFamily: "PromptRegular",
                fontSize: "1.2rem",
                color: "rgb(1,1,1)",
              }}
            >
              Products
            </Typography>
          </a>
        </Link>

        <Typography
          sx={{
            fontFamily: "PromptMedium",
            fontSize: "1.2rem",
            fontWeight: "900",
            fontStyle: "italic",
            color: "rgb(1,1,1)",
          }}
        >
          {currentBreadcrumb}
        </Typography>
      </Breadcrumbs>
    </Box>
  );
};

export default TopBreadcrumbs;
