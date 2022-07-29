import React, { useState } from "react";

// Material Design
import {
  Box,
  useTheme,
} from "@mui/material";

// Components
import BlankLayout from "@/components/shares/layouts/blank-layout";
import SidebarMenu from "@/components/dashboard/sidebar-menu";
import TopNavigation from "@/components/dashboard/top-navigation";
import MainContent from "@/components/dashboard/main-content";

/*******************************************************************************
 *                            Constant and Types                               *
 *******************************************************************************/



/***********************************************************************************
 *                          ---   MAIN FUNCTION   ---                              *
 **********************************************************************************/
export default function Dashboard() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <BlankLayout title="Dashboard" description="dashboard settings">
      <Box sx={{ display: "flex" }}>
        {/* <CssBaseline /> */}
        <TopNavigation open={open} handleDrawerOpen={handleDrawerOpen} />

        <SidebarMenu
          open={open}
          theme={theme}
          handleDrawerClose={handleDrawerClose}
        />

        <MainContent open={open} />
      </Box>
    </BlankLayout>
  );
}
