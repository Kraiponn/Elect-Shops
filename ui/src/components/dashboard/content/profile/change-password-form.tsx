import React, { ChangeEvent, useState } from "react";
import Image from "next/image";

// Material Design
import {
  Avatar,
  Box,
  Button,
  Grid,
  //   IconButton,
  Typography,
} from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CakeIcon from "@mui/icons-material/Cake";
import VpnKeyIcon from "@mui/icons-material/VpnKey";

// Form validation & Types
import { clGray100 } from "@/features/const/colors";
import { IChnagePwdForm } from "@/components/dashboard/interfaces";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Components
import ProfileImage from "@/assets/images/little-pug-dog.webp";
import PasswordBox from "@/components/dashboard/shares/password-box";
import useTranslation from "next-translate/useTranslation";

/***************************************************************************
 *    Main props and Initial value
 */
interface IProps {
  darkMode: boolean;
}

const schema = yup
  .object({
    currentPwd: yup
      .string()
      .required("Current password is mendatory")
      .min(3, "Password must be at 3 char long"),
    newPwd: yup
      .string()
      .required("New password is require")
      .min(3, "Password must be at 3 char long"),
    confirmPwd: yup
      .string()
      .required("Confirm password is require")
      .oneOf(
        [yup.ref("newPwd")],
        "Confirm password and current password does not match"
      ),
  })
  .required();

/***********************************************************************************
 *                          ---   MAIN FUNCTION   ---                              *
 **********************************************************************************/
export default function AccountForm({ darkMode }: IProps) {
  const { t } = useTranslation("dashboard");
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IChnagePwdForm>({
    resolver: yupResolver(schema),
    reValidateMode: "onChange",
  });

  // Form submit
  const handleOnSubmit: SubmitHandler<IChnagePwdForm> = (body) => {
    console.log("Form data:", body);
    //  handleAuth(body);
  };

  return (
    <form onSubmit={handleSubmit(handleOnSubmit)}>
      <Box sx={{ width: { xs: "100%", sm: "90%", lg: "70%" }, margin: "auto" }}>
        <Typography
          sx={{
            fontSize: "1.35rem",
            fontWeight: 500,
            color: darkMode ? clGray100 : "#353030d0",
            mb: 2,
            pb: "1rem",
            // borderBottom: "0.5px solid #0101012a",
          }}
        >
          {t("content.account.security.changePassword")}
        </Typography>

        <PasswordBox
          name="currentPwd"
          control={control}
          Icon={VpnKeyIcon}
          placeHolder={t("content.account.security.currentPassword")}
          errors={errors}
        />

        <PasswordBox
          name="newPwd"
          control={control}
          Icon={VpnKeyIcon}
          placeHolder={t("content.account.security.newPassword")}
          errors={errors}
        />

        <PasswordBox
          name="confirmPwd"
          control={control}
          Icon={VpnKeyIcon}
          placeHolder={t("content.account.security.confirmPassword")}
          errors={errors}
        />

        <Button type="submit" variant="contained">
          {t("content.account.security.confirm")}
        </Button>
      </Box>
    </form>
  );
}
