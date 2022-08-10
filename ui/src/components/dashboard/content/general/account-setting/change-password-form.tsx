import React from "react";

// Material Design
import { Box, Button, Typography } from "@mui/material";
import VpnKeyIcon from "@mui/icons-material/VpnKey";

// Form validation & Types
import { clGray100 } from "@/features/const/colors";
import { IChnagePwdForm } from "@/features/interfaces";
import { SubmitHandler, useForm } from "react-hook-form";
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
  const schema = yup
    .object({
      currentPwd: yup
        .string()
        .required(t(`${TRANSLATE_KEY}.security.errRequiredCurrentPwdBox`))
        .min(5, t(`${TRANSLATE_KEY}.security.errMinPwdBox`)),
      newPwd: yup
        .string()
        .required(t(`${TRANSLATE_KEY}.security.errRequiredNewPwdBox`))
        .min(5, t(`${TRANSLATE_KEY}.security.errMinPwdBox`)),
      confirmPwd: yup
        .string()
        .required(t(`${TRANSLATE_KEY}.security.errRequiredConfirmPwdBox`))
        .oneOf(
          [yup.ref(`newPwd`)],
          t(`${TRANSLATE_KEY}.security.errNotMatchPwdBox`)
        ),
    })
    .required();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IChnagePwdForm>({
    resolver: yupResolver(schema),
    reValidateMode: "onChange",
  });

  // Form submit
  const handleOnSubmit: SubmitHandler<IChnagePwdForm> = (body) => {
    console.log("Form data:", body);
    //  handleAuth(body);
  };

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
          name="currentPwd"
          control={control}
          Icon={VpnKeyIcon}
          placeHolder={t(`${TRANSLATE_KEY}.security.currentPassword`)}
          errors={errors}
        />

        <PasswordBox
          name="newPwd"
          control={control}
          Icon={VpnKeyIcon}
          placeHolder={t(`${TRANSLATE_KEY}.security.newPassword`)}
          errors={errors}
        />

        <PasswordBox
          name="confirmPwd"
          control={control}
          Icon={VpnKeyIcon}
          placeHolder={t(`${TRANSLATE_KEY}.security.confirmPassword`)}
          errors={errors}
        />

        <Button type="submit" variant="contained">
          {t(`${TRANSLATE_KEY}.security.confirm`)}
        </Button>
      </Box>
    </form>
  );
}
