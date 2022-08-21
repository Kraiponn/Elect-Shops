import React, { useEffect } from "react";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";

// Material design and Icons
import { IconButton, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";

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
  const router = useRouter();
  const { t } = useTranslation("common");

  useEffect(() => {
    if (keyword !== "") {
      setSearchKey(keyword);
    }

    return () => {
      // dispatch(clearProductState());
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

        <SearchProductBox
        // keyword={searchKey}
        // placehoder={t("topNavigation.searchBox")}
        // handleSearchChange={handleSearchChange}
        // handleKeyPress={handleKeyPress}
        // handleClickSearchBox={handleClickSearchBox}
        />

        <CartMenu />

        <IconButton
          size="large"
          edge="end"
          color="inherit"
          aria-label="home"
          onClick={() => router.push("/")}
        >
          <HomeIcon fontSize="large" />
        </IconButton>
      </Toolbar>
    </>
  );
};

export default MobileNav;
