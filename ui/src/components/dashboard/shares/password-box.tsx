import React, { useState } from "react";

// Material Design
import {
  Box,
  InputAdornment,
  OutlinedInput,
  SvgIconTypeMap,
  Typography,
} from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

// Form validation & Types
import { IChangePwdForm } from "@/features/interfaces";
import { Controller, FieldError, Control } from "react-hook-form";

/***************************************************************************
 *    Main props and Initial value
 */
type ErrorsInputType = {
  currentPassword?: FieldError | undefined;
  newPassword?: FieldError | undefined;
  confirmPassword?: FieldError | undefined;
};

interface IProps {
  name: "currentPassword" | "newPassword" | "confirmPassword";
  placeHolder: string;
  Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
  errors: ErrorsInputType;
  control: Control<IChangePwdForm, any>;
}

/***********************************************************************************
 *                          ---   MAIN FUNCTION   ---                              *
 **********************************************************************************/
export default function PasswordBox({
  name,
  placeHolder,
  Icon,
  errors,
  control,
}: IProps) {
  const [visiblePwd, setVisiblePwd] = useState<boolean>(false);

  const handleToggleVisiblePassword = () => {
    setVisiblePwd(!visiblePwd);
  };

  const handleGetPasswordState = () => {
    switch (name) {
      case "currentPassword":
        return !!errors.currentPassword;
      case "newPassword":
        return !!errors.newPassword;
      case "confirmPassword":
        return !!errors.confirmPassword;
      default:
        return !!errors.currentPassword;
    }
  };

  const handleGetPasswordErrorMsg = () => {
    switch (name) {
      case "currentPassword":
        return errors.currentPassword?.message;
      case "newPassword":
        return errors.newPassword?.message;
      case "confirmPassword":
        return errors.confirmPassword?.message;
      default:
        return errors.currentPassword?.message;
    }
  };

  return (
    <Box className="password-box_container" sx={{ width: "100%", mb: 2 }}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <OutlinedInput
            {...field}
            className="password-box"
            size="small"
            type={visiblePwd ? "text" : "password"}
            placeholder={placeHolder}
            error={handleGetPasswordState()}
            startAdornment={
              <InputAdornment position="start">
                <Icon />
              </InputAdornment>
            }
            endAdornment={
              <InputAdornment
                position="end"
                sx={{ "&:hover": { cursor: "pointer" } }}
              >
                {visiblePwd ? (
                  <VisibilityIcon onClick={handleToggleVisiblePassword} />
                ) : (
                  <VisibilityOffIcon onClick={handleToggleVisiblePassword} />
                )}
              </InputAdornment>
            }
            sx={{ width: "100%", fontSize: "1rem" }}
          />
        )}
      />
      {errors && (
        <Typography variant="h6" sx={{ color: "red" }}>
          {handleGetPasswordErrorMsg()}
        </Typography>
      )}
    </Box>
  );
}
