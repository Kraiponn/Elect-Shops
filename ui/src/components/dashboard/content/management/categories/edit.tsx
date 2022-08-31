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
  getCategoryById,
} from "@/features/global-state/reducers/category";
import { ICategory, IInputCategory } from "@/features/interfaces";

// Components
import MyDialog from "@/components/shares/dialog/confirm-dialog";
import CategoryForm from "@/components/dashboard/content/management/categories/category-form";

interface IProps {
  categoryId: number;
  onSelectTabIndex: (tabIndex: number, catId: number) => void;
}

/***********************************************************************************
 *                          ---   MAIN FUNCTION   ---                              *
 **********************************************************************************/
export default function Edit({ categoryId, onSelectTabIndex }: IProps) {
  const dispatch = useAppDispatch();
  const { darkMode } = useAppSelector((state) => state.gui);
  const [dialog, setDialog] = useState<{
    isOpen: boolean;
    confirm: boolean;
    cId: number;
  }>({
    isOpen: false,
    confirm: false,
    cId: 0,
  });
  const { isLoading, isSuccess, error, singleCategory } = useAppSelector(
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
    const fData: IInputCategory = {
      id: categoryId,
      category_name: body.category_name,
      description: body.description,
    };
    dispatch(cuCategory(fData));
  };

  // console.log("Edit tab", categoryId);

  //############################################################
  //                   Life cycle method
  //############################################################
  useEffect(() => {
    // if (categoryId !== 0) dispatch(getCategoryById(categoryId));
    // else onSelectTabIndex(0, 0);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // if (isSuccess) onSelectTabIndex(0, 0);

    return () => {
      dispatch(clearCategoryState());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

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
        {categoryId !== 0 && singleCategory ? (
          <CategoryForm
            formType="UPDATE"
            categoryId={categoryId}
            onCreateOrUpdateCategory={onCreateOrUpdateCategory}
          />
        ) : null}
      </Box>
    </>
  );
}
