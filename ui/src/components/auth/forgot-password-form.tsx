import { useState } from "react";

// Material desing
import { Box, Button } from "@mui/material";

import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { motion } from "framer-motion";
import PasswordInput from "@/components/shares/ui/password-input";
import { IAuthForm } from "@/features/interfaces";

interface IProps {
  textSubmitButton: string;
  pwdRequire: string;
  pwdMinLength: string;
}

interface IPwdInputBox {
  showPassword: boolean;
}

/***********************************************************************************
 *                          ---   MAIN FUNCTION   ---                              *
 **********************************************************************************/
const ForgotPasswordForm = ({
  textSubmitButton,
  pwdMinLength,
  pwdRequire,
}: IProps) => {
  const schema = yup
    .object({
      password: yup.string().required(pwdRequire).min(5, pwdMinLength),
    })
    .required();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IAuthForm>({
    resolver: yupResolver(schema),
    reValidateMode: "onChange",
  });
  const [values, setValues] = useState<IPwdInputBox>({
    showPassword: false,
  });

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

  // Form submit
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
            x: [50, -50, 0],
          }}
          transition={{
            ease: "easeInOut",
            duration: 1,
            delay: 0.7,
          }}
        >
          <PasswordInput
            pwdType="password"
            control={control}
            errors={errors}
            showPassword={values.showPassword}
            handleClickShowPassword={handleClickShowPassword}
            handleMouseDownPassword={handleMouseDownPassword}
          />
        </motion.div>

        <Box
          sx={{ mt: 5, paddingX: "5rem", textAlign: "center" }}
          component={motion.div}
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            y: [30, -20, 0],
          }}
          transition={{
            delay: 1.5,
            duration: 1,
            ease: "linear",
          }}
        >
          <Button sx={{ width: "50%" }} type="submit" variant="contained">
            {textSubmitButton}
          </Button>
        </Box>
      </form>
    </>
  );
};

export default ForgotPasswordForm;
