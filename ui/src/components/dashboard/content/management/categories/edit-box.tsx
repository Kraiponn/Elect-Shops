import { Box, InputAdornment, OutlinedInput, Typography } from "@mui/material";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import MenuBookIcon from "@mui/icons-material/MenuBook";

import { Controller, FieldError, Control } from "react-hook-form";
import { IInputCategory } from "@/features/interfaces";

type ErrorsInputType = {
  category_name?: FieldError | undefined;
  description?: FieldError | undefined;
};

interface IProps {
  editBoxName: "category_name" | "description";
  control: Control<IInputCategory, any>;
  errors: ErrorsInputType;
  placeholder: string;
}

/****************************************************
 *                  MAIN FUNCTION
 ***************************************************/
const EditBox = ({ errors, control, editBoxName, placeholder }: IProps) => {
  return (
    <>
      <Controller
        name={editBoxName}
        control={control}
        render={({ field }) => (
          <OutlinedInput
            {...field}
            sx={{
              boxShadow: "0 0 0.7rem rgba(1, 1, 1, 0.1)",
              //   "& .MuiOutlinedInput-notchedOutline": { border: "none" },
              //   "&:hover": {
              //     border: "0.2rem inset #0a2ef7",
              //   },
            }}
            size="small"
            type="text"
            multiline={editBoxName === "category_name" ? false : true}
            rows={editBoxName === "category_name" ? 1 : 5}
            placeholder={placeholder}
            fullWidth
            error={
              editBoxName === "category_name"
                ? !!errors.category_name
                : !!errors.description
            }
            startAdornment={
              <InputAdornment position="start">
                {editBoxName === "category_name" ? (
                  <AccountBalanceIcon />
                ) : (
                  <MenuBookIcon />
                )}
              </InputAdornment>
            }
          />
        )}
      />
      {errors && (
        <Typography sx={{ color: "red" }}>
          {editBoxName === "category_name"
            ? errors.category_name?.message
            : errors.description?.message}
        </Typography>
      )}

      <Box sx={{ mb: "1.5rem" }} />
    </>
  );
};

export default EditBox;
