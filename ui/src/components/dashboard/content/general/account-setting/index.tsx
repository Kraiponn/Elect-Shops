import React, { useEffect, useState } from "react";
import useTranslation from "next-translate/useTranslation";
import { ToastContainer, toast } from "react-toastify";

// Material Design
import { Typography, Box, Tabs, Tab, Skeleton } from "@mui/material";

// Global state
import {
  useAppSelector,
  useAppDispatch,
} from "@/features/hooks/use-global-state";
import {
  fetchProfileById,
  clearErrorAndLoadingState,
} from "@/features/global-state/reducers/auth";

// Components
import MyDialog from "@/components/shares/loader/my-dialog";
import TabPanel from "@/components/dashboard/shares/tab-panel";
import Profile from "@/components/dashboard/content/general/account-setting/profile";
import Security from "@/components/dashboard/content/general/account-setting/seurity";

interface IProps {
  darkMode: boolean;
}

interface IProfileMenu {
  profileTabNo: number;
}

const TRANSLATE_KEY = "content.generalMenu.account";

/***********************************************************************************
 *                          ---   MAIN FUNCTION   ---                              *
 **********************************************************************************/
export default function AccountSetting({ darkMode }: IProps) {
  const [profileTabNo, setProfileTabNo] = useState<IProfileMenu>({
    profileTabNo: 0,
  });
  const { user, profile, isLoading, isSuccess, error } = useAppSelector(
    (state) => state.auth
  );
  const { t } = useTranslation("dashboard");
  const dispatch = useAppDispatch();

  const ShowModalOrLoading = () => {
    return (
      <MyDialog
        type="MODAL"
        isShow={error ? true : false}
        title={error ? error.error : ""}
        description={error ? error.message.toString() : ""}
        toggleDialogState={handleClearAlertState}
      />
    );

    // if (isLoading) {
    //   return (
    //     <MyDialog
    //       type="LOADING"
    //       isShow={isLoading ? true : false}
    //       toggleDialogState={handleClearAlertState}
    //     />
    //   );
    // } else {
    //   return (
    //     <MyDialog
    //       type="MODAL"
    //       isShow={error ? true : false}
    //       title={error ? error.error : ""}
    //       description={error ? error.message.toString() : ""}
    //       toggleDialogState={handleClearAlertState}
    //     />
    //   );
    // }
  };

  const handleChange = (_: React.SyntheticEvent, index: number) => {
    setProfileTabNo({ ...profileTabNo, profileTabNo: index });
  };

  function handleClearAlertState() {
    dispatch(clearErrorAndLoadingState());
  }

  const onShowToastify = () => {
    toast.success("Profile updated is successfully.", {
      autoClose: 1000,
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  //#####################################
  //         LIFE CYCLE CONTROL
  //#####################################
  useEffect(() => {
    // if (!profile || !user) dispatch(fetchProfileById());
    if (isSuccess) {
      onShowToastify();
      handleClearAlertState();
    }

    return () => {
      handleClearAlertState();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, isSuccess, profile, user]);

  return (
    <>
      {ShowModalOrLoading()}
      <ToastContainer />

      {!profile ? (
        <Box sx={{ width: "90%", margin: "auto" }}>
          <Skeleton
            variant="circular"
            sx={{
              width: "9rem",
              height: "9rem",
              margin: "auto",
            }}
          />

          <Skeleton
            variant="rectangular"
            sx={{
              width: "100%",
              height: "2rem",
              my: "1rem",
            }}
          />
          <Skeleton
            variant="rectangular"
            sx={{
              width: "100%",
              height: "2rem",
              my: "1rem",
            }}
          />
          <Skeleton
            variant="rectangular"
            sx={{
              width: "100%",
              height: "20rem",
            }}
          />
        </Box>
      ) : (
        <Box sx={{ width: "100%", padding: "1rem" }}>
          {/* <Typography
            variant="h4"
            sx={{ color: darkMode ? clGray50 : "#010101a6" }}
          >
            {t(`${TRANSLATE_KEY}.title`)}
          </Typography> */}

          <Tabs
            value={profileTabNo.profileTabNo}
            onChange={handleChange}
            aria-label="profile tab menu"
            sx={{
              marginTop: "0.5rem",
              ".profile-tab": {
                fontFamily: "Prompt",
                fontWeight: 500,
                fontSize: "1.1rem",
              },
            }}
          >
            <Tab
              className="profile-tab"
              label={t(`${TRANSLATE_KEY}.profile.title`)}
              id={`profile-tab-${0}`}
            />
            <Tab
              className="profile-tab"
              label={t(`${TRANSLATE_KEY}.security.title`)}
              id={`profile-tab-${1}`}
            />
          </Tabs>

          <TabPanel value={profileTabNo.profileTabNo} index={0}>
            <Profile darkMode={darkMode} profile={profile} />
          </TabPanel>

          <TabPanel value={profileTabNo.profileTabNo} index={1}>
            <Security darkMode={darkMode} />
          </TabPanel>
        </Box>
      )}
    </>
  );
}
