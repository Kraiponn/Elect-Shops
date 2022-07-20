import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { Box, Toolbar, Typography } from "@mui/material";

// Icons
import HomeIcon from "@mui/icons-material/Home";

// Global state and Types
import {
  useAppDispatch,
  useAppSelector,
} from "@/features/hooks/use-global-state";
import {
  fetchProducts,
  clearProductState,
} from "@/features/global-state/reducers/product";

// Components
import SearchBox from "@/components/shares/ui/search-box";
import AccountMenu from "@/components/shares/navigates/desktop/account";
import CartMenu from "@/components/shares/navigates/desktop/cart";
import NotificationMenu from "@/components/shares/navigates/desktop/notify";
import AuthMenu from "@/components/shares/navigates/desktop/auth";
import SearchProduct from "@/components/shares/ui/search-product";

interface IProps {}

/***********************************************
 *                MAIN METHOD                  *
 **********************************************/
const DesktopNav = ({}: IProps) => {
  const router = useRouter();
  const [keyword, setKeyword] = useState<string>("");

  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { isLoading, isSuccess, isError, products } = useAppSelector(
    (state) => state.product
  );

  const handleSearchChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    // console.log(event.target.value);
    setKeyword(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === "Enter") {
      // console.log("Search key:", keyword);
      dispatch(fetchProducts(keyword));
    }
  };

  if (!isLoading && isSuccess && products.length > 0) {
    // console.log("Products result:", products);
    // router.push({
    //   pathname: "/[search]",
    //   query: {
    //     search: "search",
    //     keyword: keyword,
    //   },
    // });
  }

  // console.log("Out of useEffect..");

  useEffect(() => {
    // console.log("In useEffect...");

    return () => {
      // dispatch(clearProductState());
      // console.log("Unmounting the page");
    };
  }, []);

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

      <Box sx={{ flexGrow: 1 }} />

      <SearchProduct
        keyword={keyword}
        handleSearchChange={handleSearchChange}
        handleKeyPress={handleKeyPress}
      />
      {/* <SearchBox /> */}

      <CartMenu />

      {user ? <NotificationMenu /> : null}

      {user ? <AccountMenu /> : null}

      {!user && <AuthMenu />}
    </Toolbar>
  );
};

export default DesktopNav;
