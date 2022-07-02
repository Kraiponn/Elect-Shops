import React from "react";
import { useRouter } from "next/router";

import { Badge, Box, IconButton, Toolbar, Typography } from "@mui/material";

// Icons
import HomeIcon from "@mui/icons-material/Home";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

// Global state
import { useAppSelector } from "@/features/hooks/use-global-state";

// Components
import TextButton from "@/components/shares/navigates/main/text-button";
import SearchBox from "@/components/shares/ui/search-box";
import AccountMenu from "@/components/shares/navigates/main/account";

interface IProps {}

const DesktopNav = (props: IProps) => {
  const router = useRouter();
  const { user } = useAppSelector((state) => state.auth);

  return (
    <Toolbar>
      <HomeIcon fontSize="large" />
      <Typography
        variant="h5"
        sx={{
          ml: 1,
          flexGrow: 1,
          cursor: "pointer",
        }}
        onClick={() => router.push("/")}
      >
        {`CML SHOP`}
      </Typography>

      <SearchBox />

      <IconButton color="inherit" sx={{ marginLeft: "1.2rem" }}>
        <Badge badgeContent={9} color="secondary">
          <ShoppingCartIcon color="inherit" />
        </Badge>
      </IconButton>

      {user ? (
        <IconButton color="inherit">
          <Badge badgeContent={1} color="secondary">
            <NotificationsIcon color="inherit" />
          </Badge>
        </IconButton>
      ) : null}

      {user ? <AccountMenu /> : null}

      {!user && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mx: 1,
          }}
        >
          <TextButton
            label={`Log In`}
            OnClick={() => router.push("/auth/login")}
          />

          <Typography variant="h5" sx={{ p: 1 }}>
            |
          </Typography>

          <TextButton
            label={`Sign Up`}
            OnClick={() => router.push("/auth/signup")}
          />
        </Box>
      )}
    </Toolbar>
  );
};

export default DesktopNav;
