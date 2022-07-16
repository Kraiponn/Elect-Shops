import React from "react";
import { useRouter } from "next/router";

import { Box, Toolbar, Typography } from "@mui/material";

// Icons
import HomeIcon from "@mui/icons-material/Home";

// Global state
import { useAppSelector } from "@/features/hooks/use-global-state";

// Components
import SearchBox from "@/components/shares/ui/search-box";
import AccountMenu from "@/components/shares/navigates/desktop/account";
import CartMenu from "@/components/shares/navigates/desktop/cart";
import NotificationMenu from "@/components/shares/navigates/desktop/notify";
import AuthMenu from "@/components/shares/navigates/desktop/auth";

interface IProps {}

/***********************************************
 *                MAIN METHOD                  *
 **********************************************/
const DesktopNav = ({}: IProps) => {
  const router = useRouter();
  const { user } = useAppSelector((state) => state.auth);

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

      <SearchBox />

      <CartMenu />

      {user ? <NotificationMenu /> : null}

      {user ? <AccountMenu /> : null}

      {!user && <AuthMenu />}
    </Toolbar>
  );
};

export default DesktopNav;
