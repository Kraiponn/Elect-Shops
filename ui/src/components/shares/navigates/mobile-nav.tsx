import React from "react";
import { useRouter } from "next/router";

// Material design and Icons
import { Badge, Box, IconButton, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

// Global state
import {
  useAppSelector,
  useAppDispatch,
} from "@/features/hooks/use-global-state";
import { openMobileMenu } from "@/features/global-state/reducers/gui";

// Components
import MobileMenu from "@/components/shares/navigates/mobile";
import SearchBox from "@/components/shares/ui/search-box";
import { clSecondary } from "@/features/const/colors";

interface IProps {}

/***********************************************
 *                MAIN METHOD                  *
 **********************************************/
const MobileNav = ({}: IProps) => {
  const router = useRouter();
  const { amount } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();

  const handleOpenMobileMenu = () => {
    dispatch(openMobileMenu());
  };

  return (
    <>
      <MobileMenu />

      <Toolbar
        sx={{
          width: "100%",
        }}
      >
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={handleOpenMobileMenu}
        >
          <MenuIcon fontSize="large" />
        </IconButton>

        <Box sx={{ flexGrow: 1 }}></Box>

        <SearchBox />

        <IconButton
          color="inherit"
          sx={{ marginLeft: "1.2rem" }}
          onClick={() => router.push("/products/cart")}
        >
          <Badge
            badgeContent={amount}
            sx={{
              "& .MuiBadge-badge": {
                color: "white",
                backgroundColor: clSecondary,
              },
            }}
          >
            <ShoppingCartIcon color="inherit" />
          </Badge>
        </IconButton>
      </Toolbar>
    </>
  );
};

export default MobileNav;
