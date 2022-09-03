import React, { useEffect, useState } from "react";
import useTranslation from "next-translate/useTranslation";

// Material Design
import { Box, Typography } from "@mui/material";

// Global types and state
import { ECategory } from "@/features/const/enum";
import {
  useAppDispatch,
} from "@/features/hooks/use-global-state";
import {
  clearCategoryState,
  deleteCategoryById,
} from "@/features/global-state/reducers/category";

// Components
import MyDialog from "@/components/shares/dialog/confirm-dialog";
import CategoryList from "@/components/dashboard/content/management/categories/list";
import CreateCategory from "@/components/dashboard/content/management/categories/create";
import EditCategory from "@/components/dashboard/content/management/categories/edit";

interface ICategoryProcess {
  type: ECategory;
  cId: number;
}

/***********************************************************************************
 *                          ---   MAIN FUNCTION   ---                              *
 **********************************************************************************/
export default function Category() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation("dashboard");
  const [catObj, setCatObj] = useState<ICategoryProcess>({
    type: ECategory.READ,
    cId: 0,
  });
  const [dialog, setDialog] = useState<{
    isOpen: boolean;
    confirm: boolean;
    categoryId: number;
  }>({
    isOpen: false,
    confirm: false,
    categoryId: 0,
  });

  const handleResponse = (isConfirm: boolean) => {
    if (isConfirm) {
      setDialog({ ...dialog, isOpen: false, confirm: true });
    } else {
      setDialog({ ...dialog, isOpen: false, confirm: false });
    }
  };

  const onNavigateToCRUDOrDetail = (navType: ECategory, cId: number) => {
    if (navType === ECategory.DELETE) setDialog({ ...dialog, isOpen: true });

    setCatObj({ ...catObj, type: navType, cId });
    dispatch(clearCategoryState());
  };

  const handleUI = () => {
    switch (catObj.type) {
      case ECategory.CREATE:
        return (
          <CreateCategory onNavigateToCRUDOrDetail={onNavigateToCRUDOrDetail} />
        );

      case ECategory.UPDATE:
        return (
          <EditCategory
            categoryId={catObj.cId}
            onNavigateToCRUDOrDetail={onNavigateToCRUDOrDetail}
          />
        );

      case ECategory.DELETE:
        return (
          <CategoryList onNavigateToCRUDOrDetail={onNavigateToCRUDOrDetail} />
        );

      default:
        return (
          <CategoryList onNavigateToCRUDOrDetail={onNavigateToCRUDOrDetail} />
        );
    }
  };

  //############################################################
  //                   LIFE CYCLE CONTROL                      #
  //############################################################
  useEffect(() => {
    if (catObj.type === ECategory.DELETE && dialog.confirm) {
      setDialog({ ...dialog, confirm: false });
      dispatch(deleteCategoryById(catObj.cId));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [catObj, dialog]);

  return (
    <>
      <MyDialog
        type="CONFIRM"
        isShow={dialog.isOpen}
        title={t("content.management.category.dialog.title")}
        description={t("content.management.category.dialog.description")}
        handleResponse={handleResponse}
      />

      <Box sx={{ width: "100%", padding: "1rem" }}>
        <Typography variant="h2" component="h2">
          {t("content.management.category.title")}
        </Typography>

        {handleUI()}
      </Box>
    </>
  );
}
