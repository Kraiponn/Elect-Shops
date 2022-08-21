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
import { IProfileBody, EditBoxType } from "@/features/interfaces";
import { Controller, FieldError, Control } from "react-hook-form";

// Components

/***************************************************************************
 *    Main props and Initial value
 */
type ErrorsInputType = {
  first_name?: FieldError | undefined;
  last_name?: FieldError | undefined;
  phone?: FieldError | undefined;
  address?: FieldError | undefined;
  date_of_birth?: FieldError | undefined;
};

interface IProps {
  name: EditBoxType;
  Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
  placeHolder: string;
  errors: ErrorsInputType;
  control: Control<IProfileBody, any>;
}

/***********************************************************************************
 *                          ---   MAIN FUNCTION   ---                              *
 **********************************************************************************/
export default function EditBox({
  name,
  Icon,
  placeHolder,
  errors,
  control,
}: IProps) {
  const handleErrorState = () => {
    let state: boolean = false;

    switch (name) {
      case "first_name":
        state = !!errors.first_name;
        break;

      case "last_name":
        state = !!errors.last_name;
        break;

      case "phone":
        state = !!errors.phone;
        break;

      case "address":
        state = !!errors.address;
        break;

      case "date_of_birth":
        state = !!errors.date_of_birth;
        break;

      default:
        state = !!errors.first_name;
    }

    return state;
  };

  const handleErrorMessage = () => {
    let message: string | undefined = undefined;

    switch (name) {
      case "first_name":
        message = errors.first_name?.message;
        break;

      case "last_name":
        message = errors.last_name?.message;
        break;

      case "phone":
        message = errors.phone?.message;
        break;

      case "address":
        message = errors.address?.message;
        break;

      case "date_of_birth":
        message = errors.date_of_birth?.message;
        break;

      default:
        message = errors.first_name?.message;
    }

    return message;
  };

  return (
    <Box className="edit-box_container" sx={{ width: "100%", mb: 2 }}>
      <Controller
        name={name}
        control={control}
        defaultValue={``}
        render={({ field }) => (
          <OutlinedInput
            {...field}
            className="edit-box"
            size="small"
            type={name === "date_of_birth" ? "date" : "text"}
            placeholder={placeHolder}
            error={handleErrorState()}
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
          {handleErrorMessage()}
        </Typography>
      )}
    </Box>
  );
}
