import React, { ChangeEvent, useState } from "react";
import Image from "next/image";
import useTranslation from "next-translate/useTranslation";

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

// Form validation & Types
import { IProfileBody } from "@/components/dashboard/interfaces";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Components
import ProfileImage from "@/assets/images/little-pug-dog.webp";
import EditBox from "@/components/dashboard/shares/edit-box";

/***************************************************************************
 *    Main props and Initial value
 */
interface IProps {}

const schema = yup
  .object({
    first_name: yup.string().required(`First name is require`),
    last_name: yup.string().required(`Last name is require`),
    phone: yup.string().required(`Phone number is require`),
    address: yup.string().required(`Address is require`),
    date_of_birth: yup.date().required(`Date of birth is require`),
  })
  .required();

/***********************************************************************************
 *                          ---   MAIN FUNCTION   ---                              *
 **********************************************************************************/
export default function AccountForm({}: IProps) {
  const { t } = useTranslation("dashboard");

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IProfileBody>({
    resolver: yupResolver(schema),
    reValidateMode: "onChange",
  });

  // Form submit
  const handleOnSubmit: SubmitHandler<IProfileBody> = (body) => {
    console.log("Form data:", body);
    //  handleAuth(body);
  };

  return (
    <form onSubmit={handleSubmit(handleOnSubmit)}>
      <Box
        className="account-form_container"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          width: "100%",
          padding: "1rem 2rem",
        }}
      >
        <EditBox
          name="first_name"
          Icon={PersonIcon}
          placeHolder={t("content.account.profile.firstName")}
          control={control}
          errors={errors}
        />

        <EditBox
          name="last_name"
          Icon={PersonIcon}
          placeHolder={t("content.account.profile.lastName")}
          control={control}
          errors={errors}
        />

        <EditBox
          name="phone"
          Icon={PhoneIcon}
          placeHolder={t("content.account.profile.phoneNo")}
          control={control}
          errors={errors}
        />

        <EditBox
          name="address"
          Icon={LocationOnIcon}
          placeHolder={t("content.account.profile.address")}
          control={control}
          errors={errors}
        />

        <EditBox
          name="date_of_birth"
          Icon={CakeIcon}
          placeHolder={t("content.account.profile.dateOfBirth")}
          control={control}
          errors={errors}
        />

        <Button
          type="submit"
          color="primary"
          variant="contained"
          sx={{ mt: "1rem", paddingX: "2rem" }}
        >
          {t("content.account.profile.save")}
        </Button>
      </Box>
    </form>
  );
}
