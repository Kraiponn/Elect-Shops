import React from "react";

import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LockIcon from "@mui/icons-material/Lock";

import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { motion } from "framer-motion";

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
    email: yup.string().email().required(`Please enter email`),
    password: yup
      .string()
      .required(`Please enter password`)
      .min(5, `Password must be at least 5 characters`),
    //  confirmPassword: yup
    //    .string()
    //    .required(`Please enter confirm password`)
    //    .oneOf([yup.ref("password")], `Confirm password does not match`),
  })
  .required();

const SigninForm = (props: Props) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IAuthForm>({
    resolver: yupResolver(schema),
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
          //  initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            scale: 1.2,
          }}
          transition={{
            ease: "easeInOut",
            duration: 0.23,
          }}
        >
          <Controller
            name="email"
            control={control}
            defaultValue={``}
            render={({ field }) => (
              <TextField
                {...field}
                type="email"
                variant="outlined"
                fullWidth
                placeholder={`Email Address`}
              />
            )}
          />
        </motion.div>
        <br />

        <motion.div
          //  initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            scale: 1.2,
          }}
          transition={{
            ease: "easeInOut",
            duration: 0.2,
            yoyo: 2,
          }}
        >
          <Controller
            name="password"
            control={control}
            defaultValue={``}
            render={({ field }) => (
              <TextField
                {...field}
                type="password"
                variant="outlined"
                fullWidth
                placeholder={`Password`}
              />
            )}
          />
        </motion.div>

        {/* <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel> */}
        <OutlinedInput
          id="outlined-adornment-password"
          size="small"
          type={values.showPassword ? "text" : "password"}
          value={values.password}
          onChange={handleChange("password")}
          startAdornment={
            <InputAdornment position="start">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                <LockIcon />
              </IconButton>
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
          // label="Password"
        />
        {/* </FormControl> */}
      </form>
    </>
  );
};

export default SigninForm;
