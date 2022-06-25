import React from "react";

import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LockIcon from "@mui/icons-material/Lock";
import EmailIcon from '@mui/icons-material/Email';

import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { motion } from "framer-motion";
import EmailInput from "@/components/shares/ui/email-input";

type Props = {};
export interface IAuthForm {
  email: string;
  password: string;
}

interface State {
  amount: string;
  password: string;
  weight: string;
  weightRange: string;
  showPassword: boolean;
}

const schema = yup
  .object({
    email: yup.string().email().required(`Please enter an email`),
    password: yup
      .string()
      .required(`Please enter a password`)
      .min(5, `Password must be at least 5 characters`),
    //  confirmPassword: yup
    //    .string()
    //    .required(`Please enter confirm password`)
    //    .oneOf([yup.ref("password")], `Confirm password does not match`),
  })
  .required();

const SigninForm = (props: Props) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IAuthForm>({
    resolver: yupResolver(schema),
    reValidateMode: "onChange"
  });

  const [values, setValues] = React.useState<State>({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const onSubmit: SubmitHandler<IAuthForm> = (data) => {
    console.log(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            x: [-50, 50, 0]
          }}
          transition={{
            ease: "easeInOut",
            duration: 1,
          }}
        >
          <EmailInput
            control={control}
            errors={errors}
            showPassword={values.showPassword}
          />
        </motion.div>
        <br />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            x: [50, -50, 0]
          }}
          transition={{
            ease: "easeInOut",
            duration: 1,
            delay: 0.7,
          }}
        >
          <Controller
            name="password"
            control={control}
            defaultValue={``}
            render={({ field }) => (
              <OutlinedInput
                {...field}
                size="small"
                type={values.showPassword ? "text" : "password"}
                placeholder={`Password`}
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
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            )}
          />
          {errors && <Typography sx={{ color: 'red' }}>{errors.password?.message}</Typography>}
        </motion.div>


        <Box sx={{ mt: 5, paddingX: '5rem' }}
          component={motion.div}
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            y: [30, -20, 0]
          }}
          transition={{
            delay: 1.5,
            duration: 1,
            ease: 'linear'
          }}
        >
          <Button sx={{ py: 1 }} type="submit" variant="contained" fullWidth>{`Submit`}</Button>
        </Box>

        <Box sx={{
          mt: 3,
          textAlign: 'right',
        }}
          component={motion.div}
          initial={{ opacity: 0 }}
          animate={{ y: [20, -20, 0], opacity: 1 }}
          transition={{
            duration: 1,
            delay: 2,
            ease: 'easeInOut'
          }}
        >
          <Typography variant="h5"
            sx={{
            }}
          >Are you no have an account?</Typography>
          <Typography variant="h5"
            sx={{
              cursor: 'pointer',
              color: 'red'
            }}
          >Signup Here</Typography>
        </Box>
      </form>
    </>
  );
};

export default SigninForm;
