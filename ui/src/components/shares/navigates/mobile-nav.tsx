import React, { useEffect } from "react";
import { NextRouter } from "next/router";

// Material design and Icons
import { Badge, IconButton, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

// Components
import MobileMenu from "@/components/shares/navigates/mobile";
import SearchProductBox from "@/components/shares/ui/search-product-box";
import { clSecondary } from "@/features/const/colors";

interface IProps {
  router: NextRouter;
  quantity: number;
  keyword: string;
  searchKey: string;
  setSearchKey: React.Dispatch<React.SetStateAction<string>>;
  handleSearchChange: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  handleKeyPress: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  handleClickSearchBox: () => void;
  handleOpenMobileMenu: () => void;
}

/***********************************************************************************
 *                                MAIN FUNCTION                                    *
 **********************************************************************************/
const MobileNav = ({
  router,
  quantity,
  keyword,
  searchKey,
  setSearchKey,
  handleSearchChange,
  handleKeyPress,
  handleClickSearchBox,
  handleOpenMobileMenu,
}: IProps) => {

  useEffect(() => {
    if (keyword !== "") {
      setSearchKey(keyword);
    }

    return () => {
      // dispatch(clearProductState());
      // console.log("Unmounting the page");
    };
  }, [keyword, setSearchKey]);

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

        {/* <Box sx={{ flexGrow: 1 }}></Box> */}

        <SearchProductBox
          keyword={searchKey}
          handleSearchChange={handleSearchChange}
          handleKeyPress={handleKeyPress}
          handleClickSearchBox={handleClickSearchBox}
        />

        <IconButton
          color="inherit"
          sx={{ marginLeft: "1.2rem" }}
          onClick={() => router.push("/products/cart")}
        >
          <Badge
            badgeContent={quantity}
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
