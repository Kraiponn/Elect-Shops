import React, { ChangeEvent } from "react";

// Components
import { Box, Pagination } from "@mui/material";

interface IProps {
  total: number;
  currentPage: number;
  handlePaginationChange: (e: ChangeEvent<unknown>, page: number) => void;
}

/***********************************************
 *               MAIN METHOD
 **********************************************/
export default function TopNavigation({
  total,
  currentPage,
  handlePaginationChange,
}: IProps) {
  return (
    <Box
      sx={{
        width: "100%",
        marginY: "1rem",
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      <Pagination
        count={Math.ceil(total / 10)}
        page={currentPage}
        variant="text"
        shape="rounded"
        color="secondary"
        size="small"
        onChange={handlePaginationChange}
        sx={{ color: "rgb(1,1,1)" }}
      />
    </Box>
  );
}
