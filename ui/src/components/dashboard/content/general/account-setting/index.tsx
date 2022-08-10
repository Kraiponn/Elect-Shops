import React, { useState } from "react";
import useTranslation from "next-translate/useTranslation";

// Material Design
import { Typography, Box, Tabs, Tab } from "@mui/material";

// Components
import TabPanel from "@/components/dashboard/shares/tab-panel";
import Profile from "@/components/dashboard/content/general/account-setting/profile";
import Security from "@/components/dashboard/content/general/account-setting/seurity";

/*******************************************************************************
 *                           Constant and Types                                *
 ******************************************************************************/
import { clGray50 } from "@/features/const/colors";

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
  const { t } = useTranslation("dashboard");

  const handleChange = (_: React.SyntheticEvent, index: number) => {
    setProfileTabNo({ ...profileTabNo, profileTabNo: index });
  };

  return (
    <>
      <Box sx={{ width: "100%", padding: "1rem" }}>
        <Typography
          variant="h4"
          sx={{ color: darkMode ? clGray50 : "#010101a6" }}
        >
          {t(`${TRANSLATE_KEY}.title`)}
        </Typography>

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
          {/* <Tab
            className="profile-tab"
            label={t(`${TRANSLATE_KEY}.address.title`)}
            id={`profile-tab-${2}`}
          /> */}
        </Tabs>

        <TabPanel value={profileTabNo.profileTabNo} index={0}>
          <Profile darkMode={darkMode} />
        </TabPanel>

        <TabPanel value={profileTabNo.profileTabNo} index={1}>
          <Security darkMode={darkMode} />
        </TabPanel>

        {/* <TabPanel value={profileTabNo.profileTabNo} index={2}>
          Item Three
        </TabPanel> */}
      </Box>
    </>
  );
}
