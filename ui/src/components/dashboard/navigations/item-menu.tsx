import React from "react";

// Material Design
import { Box, SvgIconTypeMap, Typography } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { NavMenuType } from "@/components/dashboard/utils/types";

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
export default function ItemMenu({
  text,
  menuType,
  fontFamily,
  Icon,
  iconSize,
  handleSelectItemMenu,
  itemSelectType,
  isActive,
}: IProps) {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "1rem",
      }}
    >
      <Box
        onClick={() => handleSelectItemMenu(itemSelectType)}
        sx={{
          display: "flex",
          alignItems: "center",
          ml: Icon ? 1 : 0,
          color: isActive ? "red" : "inherit",
          "&:hover": {
            // color: "red",
            transform: "scale(1.1)",
            ".item-menu_icon": {
              color: "red",
            },
          },
        }}
      >
        {Icon ? (
          <Icon
            className="item-menu_icon"
            sx={{
              fontSize: iconSize ? iconSize : "1.45rem",
            }}
          />
        ) : null}

        <Typography
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
