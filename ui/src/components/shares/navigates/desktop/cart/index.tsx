import React from "react";

// Material design
import { IconButton, Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

// Global state
import { useAppSelector } from "@/features/hooks/use-global-state";

// Animations
import { dropDownMenuAnimate } from "@/components/shares/navigates/desktop/animate";

// Components
import DropdownMenu from "@/components/shares/navigates/desktop/dropdown-menu";
import ListMenu from "@/components/shares/navigates/desktop/cart/list-menu";

interface IProps {}

/***********************************************
 *                MAIN METHOD                  *
 **********************************************/
const CartMenu = ({}: IProps) => {
  const { amount } = useAppSelector((state) => state.product);

  return (
    <IconButton
      color="inherit"
      sx={{
        position: "relative",
        display: "inline-block",
        mx: 1,
        ml: 2,
        "&:hover": {
          ".list-menu": {
            visibility: "visible",
            animation: `${dropDownMenuAnimate} .35s ease-out forwards`,
          },
        },
      }}
    >
      <>
        <Badge badgeContent={amount} color="secondary">
          <ShoppingCartIcon
            sx={{
              mt: 0.5,
            }}
            fontSize="medium"
            color="inherit"
          />
        </Badge>
        <DropdownMenu top="125%" leftOfTopArrow="90%">
          <ListMenu />
        </DropdownMenu>
      </>
    </IconButton>
  );
};

export default CartMenu;
