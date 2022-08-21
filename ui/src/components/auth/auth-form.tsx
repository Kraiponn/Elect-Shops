import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";

// Material design components
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Typography,
} from "@mui/material";

// Form validation
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { motion } from "framer-motion";

// Components
import { IAuthForm } from "@/features/interfaces";
import EmailInput from "@/components/shares/ui/email-input";
import PasswordInput from "@/components/shares/ui/password-input";

interface IProps {
  authType: "LOGIN" | "SIGNUP";
  handleAuth: (body: IAuthForm) => void;
  isLoading: boolean;
  isSuccess: boolean;
}

interface IInputBox {
  showPassword: boolean;
  isRemember: boolean;
}

/***********************************************************************************
 *                          ---   MAIN FUNCTION   ---                              *
 **********************************************************************************/
const AuthForm = ({ authType, handleAuth, isLoading }: IProps) => {
  const router = useRouter();
  const { t } = useTranslation("common");
  const [values, setValues] = useState<IInputBox>({
    showPassword: false,
    isRemember: false,
  });

  const schema = yup
    .object({
      email: yup.string().email().required(t("auth.emailRequire")),
      password: yup
        .string()
        .required(t("auth.pwdRequire"))
        .min(5, t("auth.pwdMinChars"))
        .max(16, t("auth.pwdMaxChars")),
      //  confirmPassword: yup
      //    .string()
      //    .required(t("auth.confirmPwdRquire"))
      //    .oneOf([yup.ref("password")], t("auth.confirmPwdMatch")),
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
    handleAuth(body);
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
          <Button
            sx={{ py: 1, fontSize: "0.89rem" }}
            type="submit"
            variant="contained"
            fullWidth
          >
            {isLoading ? (
              <CircularProgress size={"1.5rem"} color="inherit" />
            ) : (
              <div>{t("auth.submitButton")}</div>
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
            <Box sx={{ textAlign: "center" }}>
              <Link
                href="/auth/forgot-password"
                as="/auth/forgot-password"
                locale={router.locale}
                passHref
              >
                <a>
                  <Typography sx={{ fontSize: "0.89rem" }}>
                    {t("auth.login.forgotPwdTextButton")}
                  </Typography>
                </a>
              </Link>
            </Box>
          ) : null}

          <Divider />

          <Typography
            component="h3"
            variant="subtitle2"
            sx={{
              mt: 2,
              fontSize: "0.89rem",
            }}
          >
            {authType === "LOGIN"
              ? t("auth.login.noAccountText")
              : t("auth.signup.alreadyAccount")}
          </Typography>

          <Link
            href={authType === "LOGIN" ? "/auth/signup" : "/auth/login"}
            as={authType === "LOGIN" ? "/auth/signup" : "/auth/login"}
            locale={router.locale}
            passHref
          >
            <a>
              <Typography
                component="h5"
                variant="h6"
                sx={{
                  color: "red",
                  "&:hover": {
                    transform: "scaleY(1.1)",
                    fontWeight: 700,
                  },
                }}
              >
                {authType === "LOGIN"
                  ? t("auth.login.signupTextButton")
                  : t("auth.signup.loginTextButton")}
              </Typography>
            </a>
          </Link>
        </Box>
      </form>
    </>
  );
};

export default AuthForm;
