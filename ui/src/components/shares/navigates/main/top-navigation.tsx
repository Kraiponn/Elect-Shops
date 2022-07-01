import * as React from "react";

// Material design
import {
  Box,
  AppBar,
  useMediaQuery,
} from "@mui/material";

// Components
import DesktopNav from "@/components/shares/navigates/main/desktop-nav";
import MobileNav from "@/components/shares/navigates/main/mobile-nav";

/****************************************************
 *                  MAIN FUNCTION
 */
const TopNavigation = () => {
  const isDesktop = useMediaQuery("(min-width: 900px)");

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        {isDesktop ? (<DesktopNav />) : (<MobileNav />)}
      </AppBar>
    </Box>
  );
};

export default TopNavigation;
