import React from "react";
import Image from "next/image";

// Global state and types
import {
  useAppDispatch,
  useAppSelector,
} from "@/features/hooks/use-global-state";

// Material Design
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  Theme,
} from "@mui/material";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

/*******************************************************************************
 *                           Constant and Types                                *
 ******************************************************************************/
import { DRAWER_WIDTH } from "@/components/dashboard/utils/constants";
import { clPrimary, clSecondary } from "@/features/const/colors";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
  background: clPrimary,
}));

interface IProps {
  open: boolean;
  theme: Theme;
  handleDrawerClose: () => void;
}

/***********************************************************************************
 *                          ---   MAIN FUNCTION   ---                              *
 **********************************************************************************/
export default function SidebarMenu({
  open,
  handleDrawerClose,
  theme,
}: IProps) {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <Drawer
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: DRAWER_WIDTH,
          boxSizing: "border-box",
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "ltr" ? (
            <ChevronLeftIcon
              sx={{ fontSize: "3rem", color: "rgb(255, 255, 255)" }}
            />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />

      <Box sx={{ width: "100%", display: "flex" }}>
        <Box
          sx={{
            width: "100%",
            paddingY: "0.5rem",
            background: "rgb(255, 255, 255)",
            boxShadow: "0 0 0.5rem rgb(1,1,1)",
          }}
        >
          <Box sx={{ position: "relative", width: "90%", height: "170px" }}>
            <Image
              src={user?.image_url ? user.image_url : ""}
              alt={user?.user_name}
              layout="fill"
              objectFit="contain"
            />
          </Box>
        </Box>
      </Box>

      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />

      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
