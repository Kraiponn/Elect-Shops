import React, { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import useTranslation from "next-translate/useTranslation";

// Material Design
import { clDarkMedium, clSecondary, clWhite } from "@/features/const/colors";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Pagination,
  Select,
  SelectChangeEvent,
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
import InfoIcon from "@mui/icons-material/Info";

// Global state and Types
import { ECategory } from "@/features/const/enum";
import {
  useAppSelector,
  useAppDispatch,
} from "@/features/hooks/use-global-state";
import {
  getCategories,
  clearCategoryState,
  updatePaginationChange,
} from "@/features/global-state/reducers/category";

interface IProps {
  onNavigateToCRUDOrDetail: (navType: ECategory, cId: number) => void;
}

const SUFIX_LOCALE = "content.management.category.read";

/***********************************************************************************
 *                          ---   MAIN FUNCTION   ---                              *
 **********************************************************************************/
export default function List({ onNavigateToCRUDOrDetail }: IProps) {
  const dispatch = useAppDispatch();
  const { t } = useTranslation("dashboard");
  const { darkMode } = useAppSelector((state) => state.gui);
  const [searchKey, setSearchKey] = useState<string>("");
  const {
    categories,
    pagination,
    isLoading,
    isSuccess,
    processType,
    currentPage,
    dataPerPage,
  } = useAppSelector((state) => state.category);

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.code === "Enter") {
      // console.log("Search key:", searchKey);
      dispatch(
        getCategories({
          page: currentPage,
          limit: dataPerPage,
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

  const onDataPerPageChange = (e: SelectChangeEvent) => {
    dispatch(
      updatePaginationChange({
        currentPage: 1,
        dataPerPage: Number(e.target.value),
      })
    );

    dispatch(
      getCategories({
        page: 1,
        limit: Number(e.target.value),
        noPrefixZeroIndex: true,
        searchKey,
      })
    );
  };

  const onPaginateChange = (_: ChangeEvent<unknown>, value: number) => {
    dispatch(
      updatePaginationChange({
        currentPage: value,
        dataPerPage,
      })
    );

    dispatch(
      getCategories({
        page: value,
        limit: dataPerPage,
        noPrefixZeroIndex: true,
        searchKey,
      })
    );
  };

  const handleChangeCategoryProcess = (catType: ECategory, cId: number) => {
    onNavigateToCRUDOrDetail(catType, cId);
  };

  //############################################################
  //                   LIFE CYCLE CONTROL
  //############################################################
  useEffect(() => {
    dispatch(
      getCategories({
        page: 1,
        limit: dataPerPage,
        noPrefixZeroIndex: true,
        searchKey: "",
      })
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isSuccess && categories && processType === ECategory.DELETE)
      dispatch(
        getCategories({
          page: currentPage,
          limit: dataPerPage,
          noPrefixZeroIndex: true,
          searchKey,
        })
      );
    else if (isSuccess && categories) dispatch(clearCategoryState());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, categories, processType]);

  return (
    <>
      {/* {isLoading && <LinearProgress sx={{ mt: "2rem" }} color="warning" />} */}

      <Box
        sx={{
          padding: "2rem 1rem",
          marginY: isLoading ? "0" : "2rem",
          borderRadius: "5px",
          background: darkMode ? clDarkMedium : "#ffffff",
          boxShadow: `0 0 0.5rem #0101011b`,
        }}
      >
        {/*********    DISPLAY THIS COMPONENT WHEN IS EMPTY    ***************/}
        {!categories ? (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <InfoIcon
              sx={{ fontSize: "5rem", mb: "1rem", color: clSecondary }}
            />
            <Typography
              variant="h2"
              component="h2"
              sx={{ color: darkMode ? "#fbfbfb50" : "#01010130" }}
            >
              {t(`${SUFIX_LOCALE}.emptyLabel`)}
            </Typography>

            <Button
              variant="contained"
              onClick={() => handleChangeCategoryProcess(ECategory.CREATE, 0)}
              sx={{
                px: "2rem",
                mt: "2.5rem",
              }}
            >
              {t(`${SUFIX_LOCALE}.addCategoryButton`)}
            </Button>
          </Box>
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
                placeholder={t(`${SUFIX_LOCALE}.searchBox`)}
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
                onClick={() => handleChangeCategoryProcess(ECategory.CREATE, 0)}
              >
                {t(`${SUFIX_LOCALE}.addButton`)}
              </Button>
            </Box>

            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">
                    <Typography variant="h6">
                      {t(`${SUFIX_LOCALE}.tableId`)}
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography variant="h6">
                      {t(`${SUFIX_LOCALE}.tableName`)}
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Typography variant="h6">
                      {t(`${SUFIX_LOCALE}.tableDescription`)}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="h6">{`#`}</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {categories &&
                  categories.map((cat) => (
                    <TableRow
                      key={cat.id}
                      sx={{
                        "&:hover": {
                          background: "rgba(7, 36, 255, 0.067)",
                        },
                      }}
                    >
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
                          onClick={() =>
                            handleChangeCategoryProcess(
                              ECategory.UPDATE,
                              cat.id
                            )
                          }
                        >
                          <EditIcon color="primary" />
                        </IconButton>

                        <IconButton
                          onClick={() =>
                            handleChangeCategoryProcess(
                              ECategory.DELETE,
                              cat.id
                            )
                          }
                        >
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
                <Typography variant="subtitle2">
                  {t(`${SUFIX_LOCALE}.dataPerPageLabel`)}
                </Typography>
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
                  value={dataPerPage.toString()}
                  onChange={onDataPerPageChange}
                >
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={25}>25</MenuItem>
                  <MenuItem value={50}>50</MenuItem>
                  <MenuItem value={100}>100</MenuItem>
                </Select>
              </Box>

              <Pagination
                count={Math.ceil(pagination.total / dataPerPage)}
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
