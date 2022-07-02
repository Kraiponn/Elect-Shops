import React from "react";

// Material design
import { IconButton, keyframes } from "@mui/material";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

// Components
import DropdownMenu from "@/components/shares/navigates/main/dropdown-menu";
import ListAccountMenu from "@/components/shares/navigates/main/account/menu-list";

type Props = {};

const dropDownMenuAnimate = keyframes`
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0.5;
    transform: scaleX(0.5);
  }
  75% {
    opacity: 0.75;
    transform: scaleX(1.1);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

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
          ".account_list_menu": {
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
        <DropdownMenu>
          <ListAccountMenu />
        </DropdownMenu>
      </>
    </IconButton>
  );
};

export default AccountMenu;
