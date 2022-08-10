import useTranslation from "next-translate/useTranslation";

// Material Design
import { Box } from "@mui/material";

// Types and Colors system
import { clDarkMedium, clWhite } from "@/features/const/colors";

// Components
import NotifyItemType from "@/components/dashboard/content/general/notification/list-item-type";

interface IProps {
  darkMode: boolean;
}

const TRANSLATE_KEY = "content.generalMenu.notification";

/***********************************************************************************
 *                          ---   MAIN FUNCTION   ---                              *
 **********************************************************************************/
export default function NotifyListItem({ darkMode }: IProps) {
  const { t } = useTranslation("dashboard");

  return (
    <Box
      sx={{
        padding: "2rem",
        background: darkMode ? clDarkMedium : clWhite,
        borderRadius: "0.35rem",
        boxShadow: "0 0 0.25rem #0101011d",
      }}
    >
      <NotifyItemType
        darkMode={darkMode}
        listItemType="EMAIL"
        title={t(`${TRANSLATE_KEY}.email.title`)}
        subtitle1={t(`${TRANSLATE_KEY}.email.subTitle1`)}
        description1={t(`${TRANSLATE_KEY}.email.description1`)}
        subtitle2={t(`${TRANSLATE_KEY}.email.subTitle2`)}
        description2={t(`${TRANSLATE_KEY}.email.description2`)}
      />

      <NotifyItemType
        darkMode={darkMode}
        listItemType="PHONE"
        title={t(`${TRANSLATE_KEY}.phone.title`)}
        subtitle1={t(`${TRANSLATE_KEY}.phone.subTitle`)}
        description1={t(`${TRANSLATE_KEY}.phone.description`)}
      />
    </Box>
  );
}
