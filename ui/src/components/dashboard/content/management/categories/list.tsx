import React, { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";

// Material Design
import { clDarkMedium, clWhite } from "@/features/const/colors";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  LinearProgress,
  MenuItem,
  OutlinedInput,
  Pagination,
  Select,
  SelectChangeEvent,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

// Global state
import {
  useAppSelector,
  useAppDispatch,
} from "@/features/hooks/use-global-state";
import {
  getCategories,
  clearCategoryState,
} from "@/features/global-state/reducers/category";

// Components
import MyDialog from "@/components/shares/dialog/confirm-dialog";

interface IProps {
  onSelectTabIndex: (tabIndex: number, catId: number) => void;
}

/***********************************************************************************
 *                          ---   MAIN FUNCTION   ---                              *
 **********************************************************************************/
export default function List({ onSelectTabIndex }: IProps) {
  const dispatch = useAppDispatch();
  const { darkMode } = useAppSelector((state) => state.gui);
  const [searchKey, setSearchKey] = useState<string>("");
  const [cMode, setCMode] = useState<"READ" | "EDIT">("READ");
  const { categories, pagination, isLoading, isSuccess } = useAppSelector(
    (state) => state.category
  );

  const [mPagination, setMPagination] = useState<{
    page: number;
    perPage: number;
  }>({ page: 1, perPage: 10 });

  const [dialog, setDialog] = useState<{
    isOpen: boolean;
    confirm: boolean;
    categoryId: number;
  }>({
    isOpen: false,
    confirm: false,
    categoryId: 0,
  });

  const onPerPageChange = (e: SelectChangeEvent) => {
    // console.log("Data per page ", e.target.value);
    setMPagination({ ...mPagination, perPage: Number(e.target.value) });

    dispatch(
      getCategories({
        page: mPagination.page,
        limit: Number(e.target.value),
        noPrefixZeroIndex: true,
        searchKey,
      })
    );
  };

  const onPaginateChange = (_: ChangeEvent<unknown>, value: number) => {
    // console.log("Paginate change", value);
    setMPagination({ ...mPagination, page: value });

    dispatch(
      getCategories({
        page: value,
        limit: mPagination.perPage,
        noPrefixZeroIndex: true,
        searchKey,
      })
    );
  };

  const handleChangeTabIndex = (tabIndex: number, cId: number) => {
    // console.log("List item select cateID", cId);
    onSelectTabIndex(tabIndex, cId);
  };

  const onRemoveCategory = (cId: number) => {
    setDialog({ ...dialog, isOpen: true, categoryId: cId });
  };

  const handleResponse = (isConfirm: boolean) => {
    if (isConfirm) {
      setDialog({ ...dialog, isOpen: false, confirm: true });
    } else {
      setDialog({ ...dialog, isOpen: false, confirm: false });
    }
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.code === "Enter") {
      // console.log("Search key:", searchKey);
      dispatch(
        getCategories({
          page: mPagination.page,
          limit: mPagination.perPage,
          noPrefixZeroIndex: true,
          searchKey,
        })
      );
    }
  };

  const handleSearchChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setSearchKey(event.target.value);
  };

  const handleChangeProcessMode = (mode: 'READ' | 'EDIT') => {
    setCMode(mode)
  }

  //#########################################
  //           Life cycle method
  //#########################################
  useEffect(() => {
    // if (!categories || categories.length <= 0)
    //   dispatch(
    //     getCategories({
    //       page: 1,
    //       limit: 10,
    //       noPrefixZeroIndex: true,
    //       searchKey,
    //     })
    //   );

    dispatch(
      getCategories({
        page: 1,
        limit: 10,
        noPrefixZeroIndex: true,
        searchKey,
      })
    );

    // console.log("List useEffect #1");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isSuccess) dispatch(clearCategoryState());
    if (dialog.confirm) {
      // remove code here
      setDialog({ ...dialog, isOpen: false, confirm: false });
    }

    return () => {
      if (isSuccess || isLoading) dispatch(clearCategoryState());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, dialog]);

  return (
    <>
      <MyDialog
        type="CONFIRM"
        isShow={dialog.isOpen}
        title={`Remove category`}
        description={`Are you sure to remove this category?`}
        handleResponse={handleResponse}
      />
      {isLoading && <LinearProgress sx={{ mt: "2rem" }} color="warning" />}

      <Box
        sx={{
          padding: "2rem 1rem",
          marginY: isLoading ? "0" : "2rem",
          borderRadius: "5px",
          background: darkMode ? clDarkMedium : "#ffffff",
          boxShadow: `0 0 0.5rem #0101011b`,
        }}
      >
        {!categories ? (
          <>
            <Skeleton variant="rectangular" height="5rem" />
            <Skeleton variant="rectangular" height="7rem" />
            <Skeleton variant="rectangular" height="7rem" />
          </>
        ) : (
          <>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                mb: "1rem",
              }}
            >
              <OutlinedInput
                sx={{ textAlign: "right" }}
                size="small"
                type="text"
                placeholder={`Search...`}
                onChange={handleSearchChange}
                onKeyDown={handleKeyPress}
                startAdornment={
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                }
              />

              <Button
                color="primary"
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => handleChangeTabIndex(1, 0)}
              >{`Add`}</Button>
            </Box>

            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">
                    <Typography variant="h6">{`Id`}</Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography variant="h6">{`Name`}</Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography variant="h6">{`Description`}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="h6">{`#`}</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {categories &&
                  categories.map((cat) => (
                    <TableRow key={cat.id}>
                      <TableCell align="center">
                        <Typography variant="subtitle2">{cat.id}</Typography>
                      </TableCell>

                      <TableCell align="left">
                        <Typography variant="subtitle2">
                          {cat.category_name}
                        </Typography>
                      </TableCell>

                      <TableCell align="left">
                        <Typography variant="subtitle2">
                          {cat.description}
                        </Typography>
                      </TableCell>

                      <TableCell align="center">
                        <IconButton
                          onClick={() => handleChangeTabIndex(2, cat.id)}
                        >
                          <EditIcon color="primary" />
                        </IconButton>

                        <IconButton onClick={() => onRemoveCategory(cat.id)}>
                          <DeleteIcon color="secondary" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>

            {/***************    PAGINATION    ***************/}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                mt: "2rem",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography variant="subtitle2">{`Data / page`}</Typography>
                <Select
                  sx={{
                    fontSize: "0.89rem",
                    ml: "1rem",
                    "&:hover, :active": {
                      background: darkMode ? clDarkMedium : clWhite,
                    },
                  }}
                  variant="standard"
                  size="small"
                  value={mPagination.perPage.toString()}
                  onChange={onPerPageChange}
                >
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={25}>25</MenuItem>
                  <MenuItem value={50}>50</MenuItem>
                  <MenuItem value={100}>100</MenuItem>
                </Select>
              </Box>

              <Pagination
                count={Math.ceil(pagination.total / mPagination.perPage)}
                variant="text"
                shape="rounded"
                size="small"
                showFirstButton
                showLastButton
                onChange={onPaginateChange}
              />
            </Box>
          </>
        )}
      </Box>
    </>
  );
}
