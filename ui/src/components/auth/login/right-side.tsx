import useTranslation from "next-translate/useTranslation";

// Materials components
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

// Global Types
import { IAuthForm } from "@/features/interfaces";

// Animate effects
import { motion } from "framer-motion";

// Components
import AuthForm from "@/components/auth/auth-form";

interface IProps {
  isLoading: boolean;
  isSuccess: boolean;
  handleLogin: ({ email, password }: IAuthForm) => void;
  navigateToHomePage: () => void;
}

/***********************************************************************************
 *                          ---   MAIN FUNCTION   ---                              *
 **********************************************************************************/
const RightSide = ({
  isLoading,
  isSuccess,
  handleLogin,
  navigateToHomePage,
}: IProps) => {
  const { t } = useTranslation("common");

  return (
    <Box
      sx={{
        position: "relative",
        height: "100vh",
        width: "100%",
        p: 2,
      }}
    >
      <Tooltip title={`Home page`} placement="bottom" arrow>
        <IconButton
          sx={{
            position: "absolute",
            right: 0,
            top: 0,
            padding: "2rem",
          }}
          color="inherit"
          onClick={navigateToHomePage}
        >
          <HomeIcon fontSize="large" color="inherit" />
        </IconButton>
      </Tooltip>

      <Box
        sx={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "70%", md: "55%" },
        }}
      >
        <Typography
          sx={{
            mt: 2,
            fontWeight: "900",
            textAlign: "center",
            marginBottom: "5rem",
          }}
          variant="h2"
          component={motion.div}
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: [50, -50, 0], opacity: 1 }}
          exit={{ x: 0 }}
          transition={{
            dealy: 1,
            ease: "linear",
            duration: 1,
          }}
        >
          {t("auth.login.title")}
        </Typography>

        <AuthForm
          authType="LOGIN"
          handleAuth={handleLogin}
          isLoading={isLoading}
          isSuccess={isSuccess}
        />
      </Box>
    </Box>
  );
};

export default RightSide;
