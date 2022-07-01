import * as React from "react";

// Material
import {
  Box,
  AppBar,
  useMediaQuery,
} from "@mui/material";

// Icons

// Components
import DesktopNav from "@/components/shares/navigates/desktop-nav";
import MobileNav from "@/components/shares/navigates/mobile-nav";

/****************************************************
 *  MAIN FUNCTION
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
