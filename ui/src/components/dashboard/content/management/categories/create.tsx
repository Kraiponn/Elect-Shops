import React, { useEffect } from "react";
import useTranslation from "next-translate/useTranslation";

// Material Design & System colors
import { clDarkMedium } from "@/features/const/colors";
import { Box, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// Global state and Types
import { IInputCategory } from "@/features/interfaces";
import { ECategory } from "@/features/const/enum";
import {
  useAppSelector,
  useAppDispatch,
} from "@/features/hooks/use-global-state";
import { cuCategory } from "@/features/global-state/reducers/category";

// Components
import CategoryForm from "@/components/dashboard/content/management/categories/category-form";

interface IProps {
  onNavigateToCRUDOrDetail: (navType: ECategory, cId: number) => void;
}

const SUFIX_LOCALE = "content.management.category.create";

/***********************************************************************************
 *                         ---   MAIN FUNCTION   ---                               *
 **********************************************************************************/
export default function Create({ onNavigateToCRUDOrDetail }: IProps) {
  const dispatch = useAppDispatch();
  const { t } = useTranslation("dashboard");
  const { darkMode } = useAppSelector((state) => state.gui);
  const { isLoading, isSuccess, processType } = useAppSelector(
    (state) => state.category
  );

  const onCreateOrUpdateCategory = (body: IInputCategory) => {
    dispatch(cuCategory(body));
  };

  //############################################################
  //                   LIFE CYCLE CONTROL
  //############################################################
  useEffect(() => {
    if (isSuccess && processType === ECategory.CREATE_UPDATE)
      onNavigateToCRUDOrDetail(ECategory.READ, 0);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

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
        <CategoryForm
          formType="CREATE"
          singleCategory={null}
          onCreateOrUpdateCategory={onCreateOrUpdateCategory}
        />
      </Box>
    </>
  );
}
