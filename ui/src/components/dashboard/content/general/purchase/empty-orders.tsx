import Image from "next/image";
import useTranslation from "next-translate/useTranslation";

// Material Design
import { Box, Typography } from "@mui/material";

// Color system
import { clDarkMedium } from "@/features/const/colors";

// Components
import EmptyImage from "@/assets/images/empty-cart.png";

interface IProps {
  darkMode: boolean;
}

const TRANSLATE_KEY = "content.generalMenu.purchase";

/***********************************************************************************
 *                          ---   MAIN FUNCTION   ---                              *
 **********************************************************************************/
export default function EmptyOrders({ darkMode }: IProps) {
  const { t } = useTranslation("dashboard");

  return (
    <Box
      sx={{
        width: "100%",
        padding: "2.5rem",
        marginTop: "2rem",
        boxShadow: "0 0 5px rgba(1, 1, 1, 0.114)",
        borderRadius: "0.5rem",
        background: darkMode ? clDarkMedium : "rgb(255, 255, 255)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "25rem",
          height: "15rem",
          position: "relative",
          mb: "2rem",
        }}
      >
        <Image
          src={EmptyImage}
          alt="empty order"
          layout="fill"
          objectFit="contain"
        />
      </Box>

      <Typography variant="h4">{t(`${TRANSLATE_KEY}.tap.noOrder`)}</Typography>
    </Box>
  );
}
