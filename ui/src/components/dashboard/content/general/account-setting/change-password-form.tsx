import React, { useEffect } from "react";

// Material Design
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import VpnKeyIcon from "@mui/icons-material/VpnKey";

// Global state
import {
  useAppDispatch,
  useAppSelector,
} from "@/features/hooks/use-global-state";
import { updatePassword } from "@/features/global-state/reducers/auth";

// Form validation & Types
import { clGray100 } from "@/features/const/colors";
import { IChangePwdForm, IInputEditPassword } from "@/features/interfaces";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Components
import PasswordBox from "@/components/dashboard/shares/password-box";
import useTranslation from "next-translate/useTranslation";

/***************************************************************************
 *    Main props and Initial value
 */
interface IProps {
  darkMode: boolean;
}

const TRANSLATE_KEY = "content.generalMenu.account";

/***********************************************************************************
 *                          ---   MAIN FUNCTION   ---                              *
 **********************************************************************************/
export default function AccountForm({ darkMode }: IProps) {
  const { t } = useTranslation("dashboard");
  const { profile, isLoading, isSuccess } = useAppSelector(
    (state) => state.auth
  );
  const dispatch = useAppDispatch();
  const schema = yup
    .object({
      currentPassword: yup
        .string()
        .required(t(`${TRANSLATE_KEY}.security.errRequiredCurrentPwdBox`))
        .min(5, t(`${TRANSLATE_KEY}.security.errMinPwdBox`)),
      newPassword: yup
        .string()
        .required(t(`${TRANSLATE_KEY}.security.errRequiredNewPwdBox`))
        .min(5, t(`${TRANSLATE_KEY}.security.errMinPwdBox`)),
      confirmPassword: yup
        .string()
        .required(t(`${TRANSLATE_KEY}.security.errRequiredConfirmPwdBox`))
        .oneOf(
          [yup.ref(`newPassword`)],
          t(`${TRANSLATE_KEY}.security.errNotMatchPwdBox`)
        ),
    })
    .required();

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<IChangePwdForm>({
    resolver: yupResolver(schema),
    reValidateMode: "onChange",
  });

  // Form submit
  const handleOnSubmit = (body: IChangePwdForm) => {
    // console.log("Form data:", body);

    const updatedForm: IInputEditPassword = {
      userId: profile ? profile.id : 0,
      currentPassword: body.currentPassword,
      newPassword: body.newPassword,
    };

    dispatch(updatePassword(updatedForm));
    reset();
  };

  //#####################################
  //         LIFT CYCLE CONTROL
  //#####################################
  useEffect(() => {
    if (isSuccess && !isLoading) {
      reset({ newPassword: "", currentPassword: "", confirmPassword: "" });
    }
  }, [isLoading, isSuccess, reset]);

  return (
    <form onSubmit={handleSubmit(handleOnSubmit)}>
      <Box sx={{ width: { xs: "100%", sm: "90%", lg: "70%" }, margin: "auto" }}>
        <Typography
          sx={{
            fontSize: "1.35rem",
            fontWeight: 500,
            color: darkMode ? clGray100 : "#353030d0",
            mb: 2,
            pb: "1rem",
          }}
        >
          {t(`${TRANSLATE_KEY}.security.changePassword`)}
        </Typography>

        <PasswordBox
          name="currentPassword"
          control={control}
          Icon={VpnKeyIcon}
          placeHolder={t(`${TRANSLATE_KEY}.security.currentPassword`)}
          errors={errors}
        />

        <PasswordBox
          name="newPassword"
          control={control}
          Icon={VpnKeyIcon}
          placeHolder={t(`${TRANSLATE_KEY}.security.newPassword`)}
          errors={errors}
        />

        <PasswordBox
          name="confirmPassword"
          control={control}
          Icon={VpnKeyIcon}
          placeHolder={t(`${TRANSLATE_KEY}.security.confirmPassword`)}
          errors={errors}
        />

        <Button type="submit" variant="contained">
          {isLoading && !isSuccess ? (
            <CircularProgress />
          ) : (
            t(`${TRANSLATE_KEY}.security.confirm`)
          )}
        </Button>
      </Box>
    </form>
  );
}
