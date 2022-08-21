import useTranslation from "next-translate/useTranslation";

// Material design
import { Box, Typography } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

interface IProps {
  handleSystemLogout: () => void;
}

/***********************************************************************************
 *                                MAIN FUNCTION                                    *
 **********************************************************************************/
const LogoutMenu = ({ handleSystemLogout }: IProps) => {
  const { t } = useTranslation("common");

  const handleLogout = () => {
    handleSystemLogout();
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        fontWeight: 500,
        mb: 3,
        mx: 2,
        "&:hover": {
          color: "red",
          cursor: "pointer",
        },
      }}
    >
      <LogoutIcon color="inherit" />
      <Typography
        onClick={handleLogout}
        sx={{
          fontFamily: "Prompt",
          fontSize: "1.1rem",
          ml: 1,
        }}
      >
        {t("drawerMenu.auth.logout")}
      </Typography>
    </Box>
  );
};

export default LogoutMenu;
