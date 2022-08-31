import React, { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import useTranslation from "next-translate/useTranslation";

// Material Design
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

// Global state
import {
  useAppDispatch,
  useAppSelector,
} from "@/features/hooks/use-global-state";
import {
  updateProfile,
  removeAccount,
} from "@/features/global-state/reducers/auth";
import {
  IInputEditProfile,
  IProfile,
  IProfileBody,
} from "@/features/interfaces";

// Color system
import { clDarkLight, clDarkMedium, clGray50 } from "@/features/const/colors";

// Components
import DefaultImage from "@/assets/images/little-pug-dog.webp";
import AccountForm from "@/components/dashboard/content/general/account-setting/account-form";
import ConfirmDialog from "@/components/shares/dialog/confirm-dialog";

interface IProps {
  darkMode: boolean;
  profile: IProfile;
}

interface IDialogState {
  isShow: boolean;
  isRemove: boolean;
}

const TRANSLATE_KEY = "content.generalMenu.account";

/***********************************************************************************
 *                          ---   MAIN FUNCTION   ---                              *
 **********************************************************************************/
export default function Profile({ darkMode, profile }: IProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { t } = useTranslation("dashboard");
  const [dlgState, setDlgState] = useState<IDialogState>({
    isShow: false,
    isRemove: false,
  });
  const [selectFile, setSelectFile] = useState<File | undefined>();
  const { isLoading, isSuccess } = useAppSelector((state) => state.auth);

  const handleSelectImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0)
      return setSelectFile(undefined);

    setSelectFile(e.target.files[0]);
  };

  const onEditProfile = (body: IProfileBody) => {
    // console.log("Form data", body);
    const form = new FormData();
    form.append("first_name", body.first_name);
    form.append("last_name", body.last_name);
    form.append("phone", body.phone);
    form.append("address", body.address);

    if (selectFile) form.append("image", selectFile as Blob, selectFile.name);

    const editData: IInputEditProfile = {
      form,
      userId: profile.id,
    };

    dispatch(updateProfile(editData));
  };

  const onRemoveAccount = () => {
    setDlgState({ ...dlgState, isShow: true });
  };

  const handleConfirmDialog = (result: boolean) => {
    setDlgState({
      ...dlgState,
      isShow: !dlgState.isShow,
      isRemove: result,
    });
  };

  //#####################################
  //         LIFE CYCLE CONTROL
  //#####################################
  useEffect(() => {
    if (dlgState.isRemove) {
      dispatch(removeAccount(profile.id));
      // router.push("/", "/", { locale: router.locale });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dlgState.isRemove]);

  return (
    <>
      <ConfirmDialog
        isShow={dlgState.isShow}
        handleResponse={handleConfirmDialog}
      />

      {profile ? (
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
                      selectFile
                        ? URL.createObjectURL(selectFile)
                        : profile.image_url
                        ? profile.image_url
                        : DefaultImage
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
                  {t(`${TRANSLATE_KEY}.profile.selectImage`)}
                </Button>

                <Typography variant="body2">
                  {t(`${TRANSLATE_KEY}.profile.fileSize`)}
                </Typography>
                <Typography variant="body2">
                  {t(`${TRANSLATE_KEY}.profile.fileSupport`)}
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} lg={8}>
              <AccountForm
                profile={profile}
                handleUpdateProfile={onEditProfile}
              />
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
                {t(`${TRANSLATE_KEY}.profile.deleteAccount`)}
              </Typography>
            </Grid>

            <Grid item xs={12} lg={8}>
              <Typography
                sx={{
                  fontFamily: "Prompt",
                  fontWeight: 400,
                  fontSize: "1.1rem",
                }}
              >
                {t(`${TRANSLATE_KEY}.profile.deleteAccountDescription`)}
              </Typography>

              <Button
                variant="outlined"
                color="secondary"
                sx={{ mt: 2 }}
                onClick={onRemoveAccount}
              >
                {isLoading && !isSuccess ? (
                  <CircularProgress />
                ) : (
                  t(`${TRANSLATE_KEY}.profile.deleteAccount`)
                )}
              </Button>
            </Grid>
          </Grid>
        </>
      ) : (
        <div></div>
      )}
    </>
  );
}
