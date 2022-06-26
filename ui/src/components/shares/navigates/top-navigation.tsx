import * as React from "react";
import { useRouter } from "next/router";

// Material
import {
  Box,
  Grid,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  useMediaQuery,
} from "@mui/material";

// Icons
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { motion } from "framer-motion";
import { clYellowMain } from "@/features/const/colors";

// Components
import SearchBox from "@/components/shares/ui/search-box";
import AccountListMenu from "@/components/shares/navigates/account-list";

/****************************************************
 *  MAIN FUNCTION
 */
const TopNavigation = () => {
  const router = useRouter();
  const isDesktop = useMediaQuery("(min-width: 900px)");

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {!isDesktop && (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Typography
            variant="h4"
            component={motion.div}
            sx={{ flexGrow: 1, cursor: "pointer" }}
            onClick={() => router.push("/")}
            whileHover={{
              scale: 1.009,
              color: clYellowMain,
              transition: {
                ease: "linear",
                duration: 0.3,
                yoyo: Infinity,
              },
            }}
          >
            CMK Shoping
          </Typography>

          <SearchBox />

          <IconButton color="inherit">
            <Badge badgeContent={9} color="secondary">
              <ShoppingCartIcon color="inherit" />
            </Badge>
          </IconButton>

          <IconButton color="inherit">
            <Badge badgeContent={1} color="secondary">
              <NotificationsIcon color="inherit" />
            </Badge>
          </IconButton>

          <IconButton size="large" color="inherit">
            <AccountCircleRoundedIcon
              sx={{
                fontSize: "2rem",
              }}
            />

            <AccountListMenu />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default TopNavigation;
