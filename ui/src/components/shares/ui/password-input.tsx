import React from "react";

import {
  IconButton,
  InputAdornment,
  OutlinedInput,
  Typography,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LockIcon from "@mui/icons-material/Lock";

import { Controller, FieldError, Control } from "react-hook-form";
import { IAuthForm } from "@/features/types";

type ErrorsInputType = {
  password?: FieldError | undefined;
  confirmPassword?: FieldError | undefined;
};

interface IEmailProps {
  pwdType: "password" | "confirmPassword";
  errors: ErrorsInputType;
  control: Control<IAuthForm, any>;
  showPassword: boolean;
  handleClickShowPassword: () => void;
  handleMouseDownPassword: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const PasswordInput = ({
  pwdType,
  errors,
  control,
  showPassword,
  handleClickShowPassword,
  handleMouseDownPassword,
}: IEmailProps) => {
  /*****************************************************************
   * Toggle visible or hidden a password
   */
  const handleToggleShowPassword = () => {
    handleClickShowPassword();
  };

  /*****************************************************************
   * handleMouseDown to toggle visible or hidden a password
   */
  const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    handleMouseDownPassword(e);
  };

  /*****************************************************************
   * Check error message type between password and confirmPassword
   */
  const getErrorMessage = (err: ErrorsInputType) => {
    switch (err) {
      case err.confirmPassword:
        return err.confirmPassword?.message;

      default:
        return err.password?.message;
    }
  };

  return (
    <>
      <Controller
        name="password"
        control={control}
        defaultValue={``}
        render={({ field }) => (
          <OutlinedInput
            {...field}
            size="small"
            type={showPassword ? "text" : "password"}
            placeholder={
              pwdType === "password" ? "Password" : "Confirm password"
            }
            error={
              pwdType === "password"
                ? !!errors?.password
                : !!errors?.confirmPassword
            }
            fullWidth
            startAdornment={
              <InputAdornment position="start">
                <LockIcon />
              </InputAdornment>
            }
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleToggleShowPassword}
                  onMouseDown={handleMouseDown}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        )}
      />
      {errors && (
        <Typography sx={{ color: "red" }}>{getErrorMessage(errors)}</Typography>
      )}
    </>
  );
};

export default PasswordInput;
