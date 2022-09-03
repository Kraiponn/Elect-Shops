import React, { useEffect } from "react";
import useTranslation from "next-translate/useTranslation";

// Material design & System colors
import { clDarkMedium } from "@/features/const/colors";
import { Box, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// Global state & Types
import { ECategory } from "@/features/const/enum";
import { IInputCategory } from "@/features/interfaces";
import {
  useAppSelector,
  useAppDispatch,
} from "@/features/hooks/use-global-state";
import {
  cuCategory,
  getCategoryById,
  clearCategoryState,
} from "@/features/global-state/reducers/category";

// Components
import CategoryForm from "@/components/dashboard/content/management/categories/category-form";

interface IProps {
  categoryId: number;
  onNavigateToCRUDOrDetail: (navType: ECategory, cId: number) => void;
}

const SUFIX_LOCALE = "content.management.category.create";

/***********************************************************************************
 *                          ---   MAIN FUNCTION   ---                              *
 **********************************************************************************/
export default function Edit({ categoryId, onNavigateToCRUDOrDetail }: IProps) {
  const dispatch = useAppDispatch();
  const { t } = useTranslation("dashboard");
  const { darkMode } = useAppSelector((state) => state.gui);
  const { isLoading, singleCategory, processType, isSuccess } = useAppSelector(
    (state) => state.category
  );

  const onCreateOrUpdateCategory = (body: IInputCategory) => {
    const fData: IInputCategory = {
      id: categoryId,
      category_name: body.category_name,
      description: body.description,
    };
    dispatch(cuCategory(fData));
  };

  //############################################################
  //                   LIFE CYCLE CONTROL
  //############################################################
  useEffect(() => {
    if (isSuccess && processType === ECategory.CREATE_UPDATE) {
      onNavigateToCRUDOrDetail(ECategory.READ, 0);
    } else if (singleCategory) {
      if (singleCategory.id !== categoryId)
        dispatch(getCategoryById(categoryId));
    } else if (!singleCategory) {
      dispatch(getCategoryById(categoryId));
    } else if (isSuccess) {
      dispatch(clearCategoryState());
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [singleCategory, isSuccess, processType]);

  return (
    <>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => onNavigateToCRUDOrDetail(ECategory.READ, 0)}
        sx={{ fontWeight: 900, mt: "1rem" }}
      >
        {t(`${SUFIX_LOCALE}.viewCategory`)}
      </Button>

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
            singleCategory={singleCategory}
            onCreateOrUpdateCategory={onCreateOrUpdateCategory}
          />
        ) : null}
      </Box>
    </>
  );
}
