import React from "react";

// Material design
import { IconButton, keyframes } from "@mui/material";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";

// Components
import AccountSubListMenu from "@/components/shares/navigates/main/list-menu";

type Props = {};

const arr = [
  "Code Maker Lab",
  "Code Maker Lab",
  "Code Maker Lab",
  "Code Maker Lab",
  "Code Maker Lab",
  "Code Maker Lab",
  "Code Maker Lab",
  "Code Maker Lab",
  "Code Maker Lab",
  "Code Maker Lab",
  "Code Maker Lab",
  "Code Maker Lab",
  "Code Maker Lab",
  "Code Maker Lab",
  "Code Maker Lab",
  "Code Maker Lab",
  "Code Maker Lab",
  "Code Maker Lab",
  "Code Maker Lab",
  "Code Maker Lab",
  "Code Maker Lab",
  "Code Maker Lab",
  "Code Maker Lab",
  "Code Maker Lab",
  "Code Maker Lab",
  "Code Maker Lab",
];

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
  const handleComponents = () => {
    return arr.map((str, index) => {
      return <div key={index}>{`${index}:${str}`}</div>;
    });
  };

  return (
    <IconButton
      color="inherit"
      size="large"
      sx={{
        position: "relative",
        display: "inline-block",
        zIndex: 1500,
        "&:hover": {
          ".account_list_menu": {
            visibility: "visible",
            animation: `${dropDownMenuAnimate} .35s ease-out forwards`,
          },
        },
      }}
    >
      <>
        <AccountCircleRoundedIcon
          sx={{
            fontSize: "2rem",
          }}
        />
        <AccountSubListMenu data={arr} />
      </>
    </IconButton>
  );
};

export default AccountMenu;
