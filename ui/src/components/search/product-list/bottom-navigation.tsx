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
export default function BottomNavigation({
  total,
  currentPage,
  handlePaginationChange,
}: IProps) {
  return (
    <Box
      sx={{
        width: "100%",
        marginTop: "5rem",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Pagination
        count={Math.ceil(total / 10)}
        page={currentPage}
        variant="outlined"
        shape="rounded"
        // color="primary"
        size="large"
        showFirstButton
        showLastButton
        onChange={handlePaginationChange}
        sx={{ color: "rgb(1,1,1)" }}
      />
    </Box>
  );
}
