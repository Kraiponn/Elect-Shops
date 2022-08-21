import { useRouter } from "next/router";
import Image from "next/image";

// Material design
import { Box, Typography, Button } from "@mui/material";

// Global state
import { useAppSelector } from "@/features/hooks/use-global-state";

// Components
import EmptyCartImage from "@/assets/images/empty-cart.png";
import { clDarkMedium, clWhiteGray } from "@/features/const/colors";

interface IProps {
  title: string;
  buttonLabel: string;
}

/***********************************************************************************
 *                          ---  MAIN FUNCTION   ---                               *
 **********************************************************************************/
const EmptyCart = ({ title, buttonLabel }: IProps) => {
  const { darkMode } = useAppSelector((state) => state.gui);
  const router = useRouter();

  const handleKeepShopping = () => {
    router.push("/", "/", { locale: router.locale });
  };

  return (
    <Box
      sx={{
        width: "100%",
        padding: "3rem 1rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: darkMode ? clDarkMedium : clWhiteGray,
        border: darkMode
          ? "1px solid rgba(225, 216, 216, 0.33)"
          : "1px solid rgba(44, 43, 43, 0.067)",
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: { xs: "50%", lg: "25rem" },
          height: "15rem",
        }}
      >
        <Image
          src={EmptyCartImage}
          alt="empty product in cart"
          layout="fill"
          objectFit="contain"
        />
      </Box>

      <Typography
        variant="h4"
        sx={{
          fontSize: { xs: "0.7rem", sm: "1rem", md: "1.2rem", lg: "1.5rem" },
          mt: 2,
        }}
      >
        {title}
      </Typography>

      <Button
        variant="contained"
        sx={{
          marginTop: "1.3rem",
          fontSize: "1rem",
        }}
        onClick={handleKeepShopping}
      >
        {buttonLabel}
      </Button>
    </Box>
  );
};

export default EmptyCart;
