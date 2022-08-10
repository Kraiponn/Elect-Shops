import React from "react";

// Material Design
import {
  Box,
  InputAdornment,
  OutlinedInput,
  SvgIconTypeMap,
  Typography,
} from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

// Form validation & Types
import { IChnagePwdForm } from "@/features/interfaces";
import { Controller, FieldError, Control } from "react-hook-form";

/***************************************************************************
 *    Main props and Initial value
 */
type ErrorsInputType = {
  currentPwd?: FieldError | undefined;
  newPwd?: FieldError | undefined;
  confirmPwd?: FieldError | undefined;
};

interface IProps {
  name: "currentPwd" | "newPwd" | "confirmPwd";
  placeHolder: string;
  Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
  errors: ErrorsInputType;
  control: Control<IChnagePwdForm, any>;
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
  const handleGetPwdState = () => {
    switch (name) {
      case "currentPwd":
        return !!errors.currentPwd;
      case "newPwd":
        return !!errors.newPwd;
      case "confirmPwd":
        return !!errors.confirmPwd;
      default:
        return !!errors.currentPwd;
    }
  };

  const handleGetPwdErrorMsg = () => {
    switch (name) {
      case "currentPwd":
        return errors.currentPwd?.message;
      case "newPwd":
        return errors.newPwd?.message;
      case "confirmPwd":
        return errors.confirmPwd?.message;
      default:
        return errors.currentPwd?.message;
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
            type="password"
            placeholder={placeHolder}
            error={handleGetPwdState()}
            startAdornment={
              <InputAdornment position="start">
                <Icon />
              </InputAdornment>
            }
            sx={{ width: "100%", fontSize: "1rem" }}
          />
        )}
      />
      {errors && (
        <Typography variant="h6" sx={{ color: "red" }}>
          {handleGetPwdErrorMsg()}
        </Typography>
      )}
    </Box>
  );
}
