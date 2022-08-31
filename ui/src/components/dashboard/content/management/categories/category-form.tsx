import React, { useEffect } from "react";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";

// Material design components
import { Button, Grid, Typography } from "@mui/material";

// Global state and Types
import {
  useAppSelector,
  useAppDispatch,
} from "@/features/hooks/use-global-state";
import {
  cuCategory,
  clearCategoryState,
  getCategoryById,
} from "@/features/global-state/reducers/category";

// Form validation
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Components
import { ICategory, IInputCategory } from "@/features/interfaces";
import EditBox from "@/components/dashboard/content/management/categories/edit-box";

interface IProps {
  formType: "CREATE" | "UPDATE";
  categoryId: number;
  onCreateOrUpdateCategory: (body: IInputCategory) => void;
}

/***********************************************************************************
 *                          ---   MAIN FUNCTION   ---                              *
 **********************************************************************************/
export default function CategoryForm({
  formType,
  categoryId,
  onCreateOrUpdateCategory,
}: IProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { t } = useTranslation("common");
  const { isSuccess, singleCategory } = useAppSelector(
    (state) => state.category
  );

  const schema = yup
    .object({
      category_name: yup.string().required(),
      description: yup.string().required(),
    })
    .required();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IInputCategory>({
    resolver: yupResolver(schema),
    reValidateMode: "onChange",
    defaultValues: {
      category_name: singleCategory ? singleCategory.category_name : "",
      description: singleCategory ? singleCategory.description : "",
    },
  });

  // Form submit
  const onSubmit: SubmitHandler<IInputCategory> = (body) => {
    onCreateOrUpdateCategory(body);
  };

  // console.log("Edit form", categoryId, category);

  //############################################################
  //                   Life cycle method
  //############################################################
  useEffect(() => {
    if (categoryId !== 0) dispatch(getCategoryById(categoryId));

    return () => {
      console.log("Unmount on category form");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId]);

  return (
    <>
      <Grid container>
        <Grid item xs={12} lg={5}>
          <Typography
            variant="h4"
            component="h2"
            sx={{ mb: { xs: "1rem", lg: 0 } }}
          >
            {formType === "CREATE" ? `Basic details` : `Update category`}
          </Typography>
        </Grid>

        <Grid item xs={12} lg={7}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <EditBox
              editBoxName="category_name"
              control={control}
              errors={errors}
            />

            <EditBox
              editBoxName="description"
              control={control}
              errors={errors}
            />

            <Button variant="contained" type="submit">{`SUBMIT`}</Button>
          </form>
        </Grid>
      </Grid>
    </>
  );
}
