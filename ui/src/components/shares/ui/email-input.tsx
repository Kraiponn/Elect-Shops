import useTranslation from "next-translate/useTranslation";

import { InputAdornment, OutlinedInput, Typography } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";

import { Controller, FieldError, Control } from "react-hook-form";
// import { IAuthForm } from "@/components/auth/auth-form";
import { IAuthForm, IResetPWDForm } from "@/features/interfaces";

type ErrorsInputType = {
  email?: FieldError | undefined;
  password?: FieldError | undefined;
};

interface IEmailProps {
  errors: ErrorsInputType;
  // control: Control<IAuthForm, any> | Control<IResetPWDForm, any>;
  control: Control<IAuthForm, any>;
}

/****************************************************
 *                  MAIN FUNCTION
 ***************************************************/
const EmailInput = ({ errors, control }: IEmailProps) => {
  const { t } = useTranslation("common");

  return (
    <>
      <Controller
        name="email"
        control={control}
        defaultValue={``}
        render={({ field }) => (
          <OutlinedInput
            {...field}
            size="small"
            type="email"
            placeholder={t("auth.emailBox")}
            fullWidth
            error={!!errors.email}
            startAdornment={
              <InputAdornment position="start">
                <EmailIcon />
              </InputAdornment>
            }
          />
        )}
      />
      {errors && (
        <Typography sx={{ color: "red" }}>{errors.email?.message}</Typography>
      )}
    </>
  );
};

export default EmailInput;
