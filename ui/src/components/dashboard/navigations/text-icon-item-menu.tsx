import React from "react";

// Material Design
import { Box, SvgIconTypeMap, Typography } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

// Global State and Types
import { useAppSelector } from "@/features/hooks/use-global-state";
import { NavMenuType } from "@/features/interfaces";

interface IProps {
  text: string;
  menuType: "title" | "subtitle";
  fontFamily?: "Prompt" | "Roboto" | "Itim";
  Icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
  iconSize?: string;
  handleSelectItemMenu: (item: NavMenuType) => void;
  itemSelectType: NavMenuType;
  isActive?: boolean;
}

/***********************************************************************************
 *                          ---   MAIN FUNCTION   ---                              *
 **********************************************************************************/
export default function TextIconItemMenu({
  text,
  menuType,
  fontFamily,
  Icon,
  iconSize,
  handleSelectItemMenu,
  itemSelectType,
  isActive,
}: IProps) {
  const { darkMode } = useAppSelector((state) => state.gui);

  const getBackgroudState = () => {
    if (isActive && darkMode) {
      return "rgba(208, 205, 205, 0.144)";
    } else if (isActive && !darkMode) {
      return "rgba(131, 127, 127, 0.144)";
    } else {
      return "inherit";
    }
  };

  return (
    <Box
      onClick={() => handleSelectItemMenu(itemSelectType)}
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        // padding: "0.55rem 0.5rem",
        padding: "0.55rem 0.5rem",
        borderRadius: "0.5rem",
        background: getBackgroudState(),
        "&:hover": {
          cursor: "pointer",
          background: darkMode
            ? "rgba(255, 255, 255, 0.181)"
            : "rgba(208, 205, 205, 0.144)",
          ".item-menu": {
            color: "#14b67a",
            transform: "scale(1.1)",
          },
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          ml: Icon ? 1 : 0,
          color: isActive ? "#14b67a" : "inherit",
        }}
      >
        {Icon ? (
          <Icon
            className="item-menu"
            sx={{
              fontSize: iconSize ? iconSize : "1.45rem",
            }}
          />
        ) : null}

        <Typography
          className="item-menu"
          sx={{
            fontFamily: fontFamily ? fontFamily : "Prompt",
            fontWeight: menuType === "title" ? 500 : 400,
            fontSize: menuType === "title" ? "1.1rem" : "1rem",
            ml: Icon ? "0.5rem" : 0,
            "&:hover": {
              color: "red",
            },
          }}
        >
          {text}
        </Typography>
      </Box>
    </Box>
  );
}
