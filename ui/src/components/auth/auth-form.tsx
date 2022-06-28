import React, { useState } from "react";
import { useRouter } from "next/router";

// Material design components
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";

// Form validation
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { motion } from "framer-motion";

// Components
import { IAuthForm } from "@/features/types";
import EmailInput from "@/components/shares/ui/email-input";
import PasswordInput from "@/components/shares/ui/password-input";

interface IProps {
  authType: "LOGIN" | "SIGNUP";
  signupNewMember: (body: IAuthForm) => void;
  isLoading: boolean;
  isSuccess: boolean;
}

interface IPwdInputBox {
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

/****************************************************
 *                  MAIN FUNCTION
 */
const AuthForm = ({
  authType,
  signupNewMember,
  isLoading,
  isSuccess,
}: IProps) => {
  const router = useRouter();

  const [values, setValues] = useState<IPwdInputBox>({
    showPassword: false,
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IAuthForm>({
    resolver: yupResolver(schema),
    reValidateMode: "onChange",
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
  const onSubmit: SubmitHandler<IAuthForm> = (body) => {
    signupNewMember(body);
  };

  const goToAuthPage = () => {
    if (authType === "LOGIN") router.push("/auth/signup");
    else router.push("/auth/login");
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            x: [-50, 50, 0],
          }}
          transition={{
            ease: "easeInOut",
            duration: 1,
          }}
        >
          <EmailInput control={control} errors={errors} />
        </motion.div>
        <br />

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
          sx={{ mt: 5, paddingX: "5rem" }}
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
          <Button sx={{ py: 1 }} type="submit" variant="contained" fullWidth>
            {isLoading ? (
              <CircularProgress size={"1.5rem"} color="inherit" />
            ) : (
              `Submit`
            )}
          </Button>
        </Box>

        <Box
          sx={{
            mt: 3,
            textAlign: "right",
          }}
          component={motion.div}
          initial={{ opacity: 0 }}
          animate={{ y: [20, -20, 0], opacity: 1 }}
          transition={{
            duration: 1,
            delay: 2,
            ease: "easeInOut",
          }}
        >
          {authType === "LOGIN" ? (
            <IconButton
              sx={{
                width: "100%",
                fontSize: "0.9rem",
                fontFamily: "Itim",
              }}
              onClick={() => router.push("/auth/forgot-password")}
            >
              {`Or Forgot Password?`}
            </IconButton>
          ) : null}

          <Divider />

          <Typography variant="h6" sx={{ mt: 2 }}>
            {authType === "LOGIN"
              ? `Don\'t have an account?`
              : `Already have an account?`}
          </Typography>

          <Typography
            variant="h6"
            sx={{
              cursor: "pointer",
              color: "red",
              textDecoration: "underline",
            }}
            onClick={goToAuthPage}
          >
            {authType === "LOGIN" ? `Signup Here` : `Signin Here`}
          </Typography>
        </Box>
      </form>
    </>
  );
};

export default AuthForm;
