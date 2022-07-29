import React from "react";
import { useRouter } from "next/router";

// Material design
import { Badge, Box } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

// Global state
import { useAppSelector } from "@/features/hooks/use-global-state";

// Animations
import { dropDownMenuAnimate } from "@/components/shares/navigates/desktop/animate";

// Components
import DropdownMenu from "@/components/shares/navigates/desktop/dropdown-menu";
import ListMenu from "@/components/shares/navigates/desktop/cart/list-menu";
import { clSecondary } from "@/features/const/colors";

interface IProps {}

/***********************************************************************************
 *                          ---   MAIN FUNCTION   ---                              *
 **********************************************************************************/
const CartMenu = ({}: IProps) => {
  const router = useRouter();
  const { quantity } = useAppSelector((state) => state.product);

  return (
    <Box
      sx={{
        position: "relative",
        display: "inline-block",
        mx: 1,
        ml: 5,
        "&:hover": {
          ".dropdown--list-menu": {
            visibility: "visible",
            animation: `${dropDownMenuAnimate} .35s ease-out forwards`,
          },
        },
      }}
      onClick={() => router.push(`/products/cart`)}
    >
      <>
        <Badge
          badgeContent={quantity}
          sx={{
            "& .MuiBadge-badge": {
              backgroundColor: clSecondary,
              color: "white",
            },
            cursor: "pointer",
          }}
        >
          <ShoppingCartIcon
            sx={{
              mt: 0.5,
            }}
            fontSize="medium"
            color="inherit"
          />
        </Badge>
        <DropdownMenu top="190%" right="-90%" leftOfTopArrow="89%">
          <ListMenu />
        </DropdownMenu>
      </>
    </Box>
  );
};

export default CartMenu;
