import React from 'react'

import {
  InputAdornment,
  OutlinedInput,
  Typography,
} from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';

import { Controller, FieldError, Control } from "react-hook-form";
import { IAuthForm } from '@/components/auth/signin/form';

type ErrorsInputType = {
  email?: FieldError | undefined;
  password?: FieldError | undefined;
}

interface IEmailProps {
  errors: ErrorsInputType;
  control: Control<IAuthForm, any>,
  showPassword: boolean,
}

const EmailInput = ({ errors, control, showPassword }: IEmailProps) => {


  return <>
    <Controller
      name="email"
      control={control}
      defaultValue={``}
      render={({ field }) => (
        <OutlinedInput
          {...field}
          size="small"
          type="email"
          placeholder={`Email address`}
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
    {errors && <Typography sx={{ color: 'red' }}>{errors.email?.message}</Typography>}
  </>
}

export default EmailInput;