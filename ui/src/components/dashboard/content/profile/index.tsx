import React, { ChangeEvent, useState } from "react";
import Image from "next/image";

// Material Design
import { Avatar, Box, Button, Grid, Typography } from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

// Color system
import { clDarkLight, clDarkMedium, clGray50 } from "@/features/const/colors";

// Components
import ProfileImage from "@/assets/images/little-pug-dog.webp";
import AccountForm from "@/components/dashboard/content/profile/account-form";
import useTranslation from "next-translate/useTranslation";

interface IProps {
  darkMode: boolean;
}

//3.07
/***********************************************************************************
 *                          ---   MAIN FUNCTION   ---                              *
 **********************************************************************************/
export default function Profile({ darkMode }: IProps) {
  const [selectFile, setSelectFile] = useState<File | undefined>();
  const { t } = useTranslation("dashboard");

  const handleSelectImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0)
      return setSelectFile(undefined);

    setSelectFile(e.target.files[0]);
  };

  const handleEditProfile = () => {
    //
  };

  return (
    <>
      {/******************   Profile Details   *******************/}
      <Grid
        container
        sx={{
          padding: "2.5rem",
          marginTop: "2rem",
          boxShadow: "0 0 5px rgba(1, 1, 1, 0.114)",
          borderRadius: "0.5rem",
          background: darkMode ? clDarkMedium : "rgb(255, 255, 255)",
        }}
      >
        <Grid item xs={12} lg={4}>
          <Box
            sx={{
              width: "100%",
              padding: "0.5rem 1rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              borderRight: {
                xs: "none",
                lg: "0.01rem solid rgba(1, 1, 1, 0.101)",
              },
            }}
          >
            <Avatar
              sx={{
                position: "relative",
                width: "7rem",
                height: "7rem",
                margin: "auto",
              }}
            >
              <Image
                src={
                  selectFile ? URL.createObjectURL(selectFile) : ProfileImage
                }
                alt="profile"
                layout="fill"
                objectFit="contain"
                priority
              />
            </Avatar>

            <Button
              startIcon={<CameraAltIcon />}
              variant="outlined"
              color="secondary"
              component="label"
              sx={{ my: "2rem", width: "70%" }}
            >
              <input
                hidden
                accept="image/*"
                type="file"
                onChange={handleSelectImageChange}
              />
              {t("content.account.profile.selectImage")}
            </Button>

            <Typography variant="body2">
              {t("content.account.profile.fileSize")}
            </Typography>
            <Typography variant="body2">
              {t("content.account.profile.fileSupport")}
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} lg={8}>
          <AccountForm />
        </Grid>
      </Grid>

      {/******************   Delete Account   *******************/}
      <Grid
        container
        sx={{
          padding: "2.5rem",
          marginTop: "2rem",
          boxShadow: "0 0 5px rgba(1, 1, 1, 0.114)",
          borderRadius: "0.5rem",
          background: darkMode ? clDarkMedium : "rgb(255, 255, 255)",
        }}
      >
        <Grid item xs={12} lg={4}>
          <Typography
            component="h3"
            sx={{
              color: darkMode ? clGray50 : clDarkLight,
              fontWeight: 500,
              fontSize: "1.35rem",
              mb: 1,
            }}
          >
            {t("content.account.profile.deleteAccount")}
          </Typography>
        </Grid>

        <Grid item xs={12} lg={8}>
          <Typography
            sx={{ fontFamily: "Prompt", fontWeight: 400, fontSize: "1.1rem" }}
          >
            {t("content.account.profile.deleteAccountDescription")}
          </Typography>

          <Button variant="outlined" color="secondary" sx={{ mt: 2 }}>
            {t("content.account.profile.deleteAccount")}
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
