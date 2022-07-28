import React, { useEffect, useState } from "react";
import { NextRouter, useRouter } from "next/router";

// Global state and Types
import {
  useAppDispatch,
  useAppSelector,
} from "@/features/hooks/use-global-state";
import { fetchProducts } from "@/features/global-state/reducers/product";
import { IAuthPayload, ICart } from "@/features/types";

// Material Design & Components
import { Box, Toolbar, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

import AccountMenu from "@/components/shares/navigates/desktop/account";
import CartMenu from "@/components/shares/navigates/desktop/cart";
import NotificationMenu from "@/components/shares/navigates/desktop/notify";
import AuthMenu from "@/components/shares/navigates/desktop/auth";
import SearchProductBox from "@/components/shares/ui/search-product-box";

interface IProps {
  router: NextRouter;
  user: IAuthPayload | null | undefined;
  keyword: string;
  searchKey: string;
  setSearchKey: React.Dispatch<React.SetStateAction<string>>;
  handleSearchChange: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  handleKeyPress: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  handleClickSearchBox: () => void;
}

/***********************************************************************************
 *                                MAIN FUNCTION                                    *
 **********************************************************************************/
const DesktopNav = ({
  router,
  user,
  keyword,
  searchKey,
  setSearchKey,
  handleSearchChange,
  handleKeyPress,
  handleClickSearchBox,
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
    <Toolbar>
      <HomeIcon fontSize="large" />
      <Typography
        variant="h4"
        sx={{
          ml: 1,
          cursor: "pointer",
        }}
        onClick={() => router.push("/")}
      >
        {`Shob shop`}
      </Typography>

      {/* <Box sx={{ flexGrow: 1 }} /> */}

      <SearchProductBox
        keyword={searchKey}
        handleSearchChange={handleSearchChange}
        handleKeyPress={handleKeyPress}
        handleClickSearchBox={handleClickSearchBox}
      />

      <CartMenu />

      {user ? <NotificationMenu /> : null}

      {user ? <AccountMenu /> : null}

      {!user && <AuthMenu />}
    </Toolbar>
  );
};

export default DesktopNav;
