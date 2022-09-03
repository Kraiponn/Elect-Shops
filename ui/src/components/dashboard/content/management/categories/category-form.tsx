import React, { useEffect } from "react";
import useTranslation from "next-translate/useTranslation";

// Material design components
import { Button, CircularProgress, Grid, Typography } from "@mui/material";

// Global state and Types
import { useAppSelector } from "@/features/hooks/use-global-state";

// Form validation
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Components
import { ICategory, IInputCategory } from "@/features/interfaces";
import EditBox from "@/components/dashboard/content/management/categories/edit-box";

interface IProps {
  formType: "CREATE" | "UPDATE";
  singleCategory: ICategory | null;
  onCreateOrUpdateCategory: (body: IInputCategory) => void;
}

const SUFIX_LOCALE = "content.management.category.create";

/***********************************************************************************
 *                          ---   MAIN FUNCTION   ---                              *
 **********************************************************************************/
export default function CategoryForm({
  formType,
  singleCategory,
  onCreateOrUpdateCategory,
}: IProps) {
  const { t } = useTranslation("dashboard");
  const { isLoading } = useAppSelector((state) => state.category);

  const schema = yup
    .object({
      category_name: yup.string().required(),
      description: yup.string().required(),
    })
    .required();

  const {
    handleSubmit,
    control,
    setValue,
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

  //############################################################
  //                   LIFE CYCLE CONTROL                      #
  //############################################################
  useEffect(() => {
    if (singleCategory) {
      setValue("category_name", singleCategory.category_name);
      setValue("description", singleCategory.description);
    }
  }, [setValue, singleCategory]);

  return (
    <>
      <Grid container>
        <Grid item xs={12} lg={5}>
          <Typography
            variant="h4"
            component="h2"
            sx={{ mb: { xs: "1rem", lg: 0 } }}
          >
            {formType === "CREATE"
              ? t(`${SUFIX_LOCALE}.createTitle`)
              : t(`${SUFIX_LOCALE}.updateTitle`)}
          </Typography>
        </Grid>

        <Grid item xs={12} lg={7}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <EditBox
              editBoxName="category_name"
              control={control}
              errors={errors}
              placeholder={t(`${SUFIX_LOCALE}.categoryName`)}
            />

            <EditBox
              editBoxName="description"
              control={control}
              errors={errors}
              placeholder={t(`${SUFIX_LOCALE}.description`)}
            />

            <Button variant="contained" type="submit">
              {isLoading ? (
                <CircularProgress />
              ) : (
                t(`${SUFIX_LOCALE}.submitButton`)
              )}
            </Button>
          </form>
        </Grid>
      </Grid>
    </>
  );
}
