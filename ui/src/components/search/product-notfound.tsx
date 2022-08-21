import Image from "next/image";

// Components
import { Box, Typography } from "@mui/material";
import ProductNotFoundLogo from "@/assets/images/empty-cart.png";

interface IProps {
  title: string;
  subtitle: string;
}

/***********************************************************************************
 *                                MAIN FUNCTION                                    *
 **********************************************************************************/
export default function ProductNotFound({ title, subtitle }: IProps) {
  return (
    <Box
      sx={{
        width: "75%",
        minHeight: "80vh",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        // border: "0.001rem solid rgba(182, 180, 180, 0.356)",
      }}
    >
      <Typography
        variant="h1"
        sx={{
          color: "rgb(251, 5, 5)",
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="h4"
        sx={{
          color: "#919090d2",
          marginY: "1rem",
        }}
      >
        {subtitle}
      </Typography>

      <Box sx={{ position: "relative", width: "50%", height: "15rem" }}>
        <Image
          src={ProductNotFoundLogo}
          alt="not found"
          layout="fill"
          objectFit="contain"
        />
      </Box>
    </Box>
  );
}
