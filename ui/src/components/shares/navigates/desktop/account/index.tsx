import React from "react";

// Material design
import { IconButton, keyframes } from "@mui/material";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import PersonIcon from '@mui/icons-material/Person';

// Animations
import { dropDownMenuAnimate } from "@/components/shares/navigates/desktop/animate";

// Components
import DropdownMenu from "@/components/shares/navigates/desktop/dropdown-menu";
import ListAccountMenu from "@/components/shares/navigates/desktop/account/list-menu";

type Props = {};

/***********************************************
 *                MAIN METHOD                  *
 **********************************************/
const AccountMenu = (props: Props) => {
  return (
    <IconButton
      color="inherit"
      sx={{
        position: "relative",
        display: "inline-block",
        mx: 1,
        "&:hover": {
          ".list-menu": {
            visibility: "visible",
            animation: `${dropDownMenuAnimate} .35s ease-out forwards`,
          },
        },
      }}
    >
      <>
        <ManageAccountsIcon
          color="inherit"
          fontSize="large"
          sx={{
            mt: 0.5,
          }}
        />
        <DropdownMenu top="105%" leftOfTopArrow="90%">
          <ListAccountMenu />
        </DropdownMenu>
      </>
    </IconButton>
  );
};

export default AccountMenu;
