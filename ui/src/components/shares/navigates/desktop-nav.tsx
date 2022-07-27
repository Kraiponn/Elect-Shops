import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

// Global state and Types
import {
  useAppDispatch,
  useAppSelector,
} from "@/features/hooks/use-global-state";
import {
  fetchProducts,
} from "@/features/global-state/reducers/product";

// Material ui
import { Box, Toolbar, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

// Components
// import SearchBox from "@/components/shares/ui/search-box";
import AccountMenu from "@/components/shares/navigates/desktop/account";
import CartMenu from "@/components/shares/navigates/desktop/cart";
import NotificationMenu from "@/components/shares/navigates/desktop/notify";
import AuthMenu from "@/components/shares/navigates/desktop/auth";
import SearchProduct from "@/components/shares/ui/search-product";

interface IProps { }

/***********************************************
 *                MAIN METHOD                  *
 **********************************************/
const DesktopNav = ({ }: IProps) => {
  const router = useRouter();
  const [searchKey, setSearchKey] = useState<string>("");

  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { keyword } = useAppSelector(state => state.product)

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

  useEffect(() => {
    if (keyword !== '') {
      setSearchKey(keyword)
    }

    return () => {
      // dispatch(clearProductState());
      // console.log("Unmounting the page");
    };
  }, [keyword]);

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
        keyword={searchKey}
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
