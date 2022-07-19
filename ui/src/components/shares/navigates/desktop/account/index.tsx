import React from "react";

// Material design
import { IconButton } from "@mui/material";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

// Animations
import { dropDownMenuAnimate } from "@/components/shares/navigates/desktop/animate";

// Components
import DropdownMenu from "@/components/shares/navigates/desktop/dropdown-menu";
import ListAccountMenu from "@/components/shares/navigates/desktop/account/list-menu";
import { NextPage } from "next";

/***********************************************
 *                MAIN METHOD                  *
 **********************************************/
const AccountMenu: NextPage = () => {
  return (
    <IconButton
      color="inherit"
      sx={{
        position: "relative",
        display: "inline-block",
        mx: 1,
        "&:hover": {
          ".dropdown--list-menu": {
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
        <DropdownMenu top="110%" right="0" leftOfTopArrow="90%">
          <ListAccountMenu />
        </DropdownMenu>
      </>
    </IconButton>
  );
};

export default AccountMenu;
