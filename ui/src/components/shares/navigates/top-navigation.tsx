import React, { useState } from "react";
import { useRouter } from "next/router";

// Global state and Types
import {
  useAppDispatch,
  useAppSelector,
} from "@/features/hooks/use-global-state";
import { fetchProducts } from "@/features/global-state/reducers/product";
import { openMobileMenu } from "@/features/global-state/reducers/gui";

// Material design
import { Box, AppBar, useMediaQuery } from "@mui/material";

// Components
import DesktopNav from "@/components/shares/navigates/desktop-nav";
import MobileNav from "@/components/shares/navigates/mobile-nav";

/***********************************************************************************
 *                                MAIN FUNCTION                                    *
 **********************************************************************************/
const TopNavigation = () => {
  const isDesktop = useMediaQuery("(min-width: 900px)");
  const router = useRouter();
  const [searchKey, setSearchKey] = useState<string>("");

  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { keyword } = useAppSelector((state) => state.product);

  const handleOpenMobileMenu = () => {
    dispatch(openMobileMenu());
  };

  const handleSearchChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    // console.log(event.target.value);
    setSearchKey(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === "Enter") {
      // console.log("Search key:", searchKey);
      dispatch(fetchProducts(searchKey));
    }
  };

  const handleClickSearchBox = () => {
    dispatch(fetchProducts(searchKey));
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ background: "rgba(0, 0, 0, 0.851)" }}>
        {isDesktop ? (
          <DesktopNav
            router={router}
            keyword={keyword}
            user={user}
            searchKey={searchKey}
            setSearchKey={setSearchKey}
            handleSearchChange={handleSearchChange}
            handleKeyPress={handleKeyPress}
            handleClickSearchBox={handleClickSearchBox}
          />
        ) : (
          <MobileNav
            keyword={keyword}
            searchKey={searchKey}
            setSearchKey={setSearchKey}
            handleSearchChange={handleSearchChange}
            handleKeyPress={handleKeyPress}
            handleClickSearchBox={handleClickSearchBox}
            handleOpenMobileMenu={handleOpenMobileMenu}
          />
        )}
      </AppBar>
    </Box>
  );
};

export default TopNavigation;
