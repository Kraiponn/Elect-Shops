import React from "react";
import useTranslation from "next-translate/useTranslation";

// Material Design
import { Box, Button } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CakeIcon from "@mui/icons-material/Cake";

// Form validation & Types
import { IProfileBody } from "@/features/interfaces";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Components
import EditBox from "@/components/dashboard/shares/edit-box";

const TRANSLATE_KEY = "content.generalMenu.account";

/***********************************************************************************
 *                          ---   MAIN FUNCTION   ---                              *
 **********************************************************************************/
export default function AccountForm() {
  const { t } = useTranslation("dashboard");
  const schema = yup
    .object({
      first_name: yup
        .string()
        .required(t(`${TRANSLATE_KEY}.profile.errFirstNameBox`)),
      last_name: yup
        .string()
        .required(t(`${TRANSLATE_KEY}.profile.errLastNameBox`)),
      phone: yup.string().required(t(`${TRANSLATE_KEY}.profile.errPhoneNoBox`)),
      address: yup
        .string()
        .required(t(`${TRANSLATE_KEY}.profile.errAddressBox`)),
      date_of_birth: yup
        .string()
        // .date()
        .required(t(`${TRANSLATE_KEY}.profile.errDateOfBirthBox`)),
    })
    .required();

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
          placeHolder={t(`${TRANSLATE_KEY}.profile.firstName`)}
          control={control}
          errors={errors}
        />

        <EditBox
          name="last_name"
          Icon={PersonIcon}
          placeHolder={t(`${TRANSLATE_KEY}.profile.lastName`)}
          control={control}
          errors={errors}
        />

        <EditBox
          name="phone"
          Icon={PhoneIcon}
          placeHolder={t(`${TRANSLATE_KEY}.profile.phoneNo`)}
          control={control}
          errors={errors}
        />

        <EditBox
          name="address"
          Icon={LocationOnIcon}
          placeHolder={t(`${TRANSLATE_KEY}.profile.address`)}
          control={control}
          errors={errors}
        />

        <EditBox
          name="date_of_birth"
          Icon={CakeIcon}
          placeHolder={t(`${TRANSLATE_KEY}.profile.dateOfBirth`)}
          control={control}
          errors={errors}
        />

        <Button
          type="submit"
          color="primary"
          variant="contained"
          sx={{ mt: "1rem", paddingX: "2rem" }}
        >
          {t(`${TRANSLATE_KEY}.profile.save`)}
        </Button>
      </Box>
    </form>
  );
}
