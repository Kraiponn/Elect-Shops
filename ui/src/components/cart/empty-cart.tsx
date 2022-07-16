import { useRouter } from "next/router";
import Image from "next/image";

// Material design
import { Box, Typography, Button } from "@mui/material";

// Components
import EmptyCartImage from "@/assets/images/empty-shopping-cart-v2.jpg";

interface IProps {}

/***********************************************
 *                MAIN METHOD                  *
 **********************************************/
const EmptyCart = ({}: IProps) => {
  const router = useRouter();

  const handleKeepShopping = () => {
    router.push("/");
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "45vh",
        padding: "2rem 0",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        border: "1px solid #f0f4f6",
      }}
    >
      <Box sx={{ position: "relative", width: "15rem", height: "15rem" }}>
        <Image
          src={EmptyCartImage}
          alt="empty product in cart"
          layout="fill"
          objectFit="contain"
        />
      </Box>

      <Typography
        sx={{
          fontSize: "1.2rem",
          fontWeight: 500,
          fontFamily: "PromptRegular",
        }}
      >
        {`Your cart is empty. Keep shopping to find a course!`}
      </Typography>

      <Button
        variant="contained"
        sx={{
          marginTop: "1.2rem",
          fontSize: "1rem",
        }}
        onClick={handleKeepShopping}
      >
        Keep Shopping
      </Button>
    </Box>
  );
};

export default EmptyCart;
