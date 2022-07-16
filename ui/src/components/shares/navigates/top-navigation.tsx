import * as React from "react";

// Material design
import { Box, AppBar, useMediaQuery } from "@mui/material";

// Components
import DesktopNav from "@/components/shares/navigates/desktop-nav";
import MobileNav from "@/components/shares/navigates/mobile-nav";

/****************************************************
 *                  MAIN FUNCTION
 */
const TopNavigation = () => {
  const isDesktop = useMediaQuery("(min-width: 900px)");

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ background: "rgba(0, 0, 0, 0.851)" }}>
        {isDesktop ? <DesktopNav /> : <MobileNav />}
      </AppBar>
    </Box>
  );
};

export default TopNavigation;
