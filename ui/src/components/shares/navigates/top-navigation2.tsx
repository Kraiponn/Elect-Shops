import * as React from "react";

// Material
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

// Icons
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountIcon from "@mui/icons-material/AccountCircle";

type Props = {};

const TopNavigation = (props: Props) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
            CMK Shoping
          </Typography>

          <IconButton size="large" color="inherit">
            <AccountIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default TopNavigation;
