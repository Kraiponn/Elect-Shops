import React, { useEffect } from "react";

// Material design and Icons
import { IconButton, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

// Components
import MobileMenu from "@/components/shares/navigates/mobile";
import SearchProductBox from "@/components/shares/ui/search-product-box";
import CartMenu from "@/components/shares/navigates/desktop/cart";

interface IProps {
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

        <CartMenu />
      </Toolbar>
    </>
  );
};

export default MobileNav;
