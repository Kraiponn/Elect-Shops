import useTranslation from "next-translate/useTranslation";

// Material Design
import {
  Box,
  Button,
  InputAdornment,
  OutlinedInput,
  Typography,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";

// Types and Colors system
import { clDarkMedium, clWhite } from "@/features/const/colors";

interface IProps {
  darkMode: boolean;
}

const TRANSLATE_KEY = "content.generalMenu.account";

/***********************************************************************************
 *                          ---   MAIN FUNCTION   ---                              *
 **********************************************************************************/
export default function Team({ darkMode }: IProps) {
  const { t } = useTranslation("dashboard");

  return (
    <Box sx={{ height: "100vh" }}>
      <Typography
        variant="h3"
        sx={{
          my: "2rem",
        }}
      >
        {t(`${TRANSLATE_KEY}.team.title`)}
      </Typography>

      <Box
        sx={{
          padding: "2rem",
          background: darkMode ? clDarkMedium : clWhite,
          borderRadius: "0.35rem",
          boxShadow: "0 0 0.25rem #0101011d",
          display: "flex",
          alignItems: "center",
        }}
      >
        <OutlinedInput
          className="edit-box"
          size="small"
          type="email"
          placeholder={t(`${TRANSLATE_KEY}.team.emailBoxPlaceholder`)}
          startAdornment={
            <InputAdornment position="start">
              <EmailIcon />
            </InputAdornment>
          }
          sx={{
            fontSize: "1rem",
            flexGrow: 1,
            border: "none",
            boxShadow: "0 0 5px #010101e",
          }}
        />

        <Button variant="contained" sx={{ ml: 1 }}>
          {t(`${TRANSLATE_KEY}.team.buttonSendInvite`)}
        </Button>
      </Box>
    </Box>
  );
}
