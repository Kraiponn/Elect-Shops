import React from "react";
// import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import dayjs from "dayjs";
import buddhistEra from "dayjs/plugin/buddhistEra";

// Material Design
// import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

import { Box, Button, CircularProgress } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
// import CakeIcon from "@mui/icons-material/Cake";

// Global state
import { useAppSelector } from "@/features/hooks/use-global-state";

// Form validation & Types
import { IProfile, IProfileBody } from "@/features/interfaces";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Components
import EditBox from "@/components/dashboard/shares/edit-box";

interface IProps {
  profile: IProfile;
  handleUpdateProfile: (body: IProfileBody) => void;
}

dayjs.extend(buddhistEra);
const TRANSLATE_KEY = "content.generalMenu.account";

/***********************************************************************************
 *                          ---   MAIN FUNCTION   ---                              *
 **********************************************************************************/
export default function AccountForm({ profile, handleUpdateProfile }: IProps) {
  const { t } = useTranslation("dashboard");
  const { isLoading } = useAppSelector((state) => state.auth);

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
      // date_of_birth: yup
      //   .string()
      //   .required(t(`${TRANSLATE_KEY}.profile.errDateOfBirthBox`)),
    })
    .required();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IProfileBody>({
    resolver: yupResolver(schema),
    reValidateMode: "onChange",
    defaultValues: {
      first_name: profile.first_name ? profile.first_name : "",
      last_name: profile.last_name ? profile.last_name : "",
      phone: profile.phone ? profile.phone : "",
      address: profile.address ? profile.address : "",
      // date_of_birth: dayjs(profile.date_of_birth)
      //   .locale(router.locale === "th" ? "th" : "en-US")
      //   .format("YYYY-MM-DD HH:mm:ss"),
    },
  });

  // Form submit
  const handleOnSubmit: SubmitHandler<IProfileBody> = (body) => {
    // console.log("Form data:", body);
    handleUpdateProfile(body);
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

        {/* <EditBox
          name="date_of_birth"
          Icon={CakeIcon}
          placeHolder={t(`${TRANSLATE_KEY}.profile.dateOfBirth`)}
          control={control}
          errors={errors}
        /> */}

        {/* <Controller
          name="date_of_birth"
          control={control}
          render={({ field }) => (
            <DatePicker
              // {...field}
              // renderInput={(props) => <TextField {...props} />}
              placeholderText="Select date"
              onChange={(date) => field.onChange(date)}
              selected={field.value}
            />
          )}
        /> */}

        <Button
          type="submit"
          color="primary"
          variant="contained"
          sx={{ mt: "1rem", paddingX: "2rem" }}
        >
          {isLoading ? (
            <CircularProgress />
          ) : (
            t(`${TRANSLATE_KEY}.profile.save`)
          )}
        </Button>
      </Box>
    </form>
  );
}
