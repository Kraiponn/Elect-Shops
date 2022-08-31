import React, { useEffect, useState } from "react";

// Material Design
import { clDarkMedium } from "@/features/const/colors";
import { Box, LinearProgress } from "@mui/material";

// Global state
import {
  useAppSelector,
  useAppDispatch,
} from "@/features/hooks/use-global-state";
import {
  cuCategory,
  clearCategoryState,
} from "@/features/global-state/reducers/category";
import { IInputCategory } from "@/features/interfaces";

// Components
import MyDialog from "@/components/shares/dialog/confirm-dialog";
import CategoryForm from "@/components/dashboard/content/management/categories/category-form";

interface IProps {
  onSelectTabIndex: (tabIndex: number, catId: number) => void;
}

/***********************************************************************************
 *                          ---   MAIN FUNCTION   ---                              *
 **********************************************************************************/
export default function Create({ onSelectTabIndex }: IProps) {
  const { darkMode } = useAppSelector((state) => state.gui);
  const [dialog, setDialog] = useState<{
    isOpen: boolean;
    confirm: boolean;
    categoryId: number;
  }>({
    isOpen: false,
    confirm: false,
    categoryId: 0,
  });
  const dispatch = useAppDispatch();
  const { isLoading, isSuccess, error } = useAppSelector(
    (state) => state.category
  );

  const handleResponse = (isConfirm: boolean) => {
    if (isConfirm) {
      setDialog({ ...dialog, isOpen: false, confirm: true });
    } else {
      setDialog({ ...dialog, isOpen: false, confirm: false });
    }

    dispatch(clearCategoryState());
  };

  const onCreateOrUpdateCategory = (body: IInputCategory) => {
    dispatch(cuCategory(body));
  };

  //#########################################
  //           Life cycle method
  //#########################################
  useEffect(() => {
    if (isSuccess) onSelectTabIndex(0, 0);

    return () => {
      dispatch(clearCategoryState());
    };
  }, [dispatch, isSuccess, onSelectTabIndex]);

  return (
    <>
      {error && (
        <MyDialog
          type="ERROR"
          isShow={error ? true : false}
          title={error.error}
          description={error.message as string}
          handleResponse={handleResponse}
        />
      )}
      {isLoading && <LinearProgress sx={{ mt: "2rem" }} color="warning" />}

      <Box
        sx={{
          padding: "2rem 1rem",
          marginY: isLoading ? "0" : "2rem",
          borderRadius: "5px",
          background: darkMode ? clDarkMedium : "#ffffff",
          boxShadow: `0 0 0.7rem #0101011b`,
        }}
      >
        <CategoryForm
          formType="CREATE"
          categoryId={0}
          onCreateOrUpdateCategory={onCreateOrUpdateCategory}
        />
      </Box>
    </>
  );
}
