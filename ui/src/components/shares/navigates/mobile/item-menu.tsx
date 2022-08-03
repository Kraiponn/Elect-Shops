import React from "react";

// Material design
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { Badge, Box, SvgIconTypeMap, Typography } from "@mui/material";
import { MenuType } from "@/components/shares/navigates/enum";
import { clSecondary } from "@/features/const/colors";

interface IProps {
  isTitle: boolean;
  titleLabel?: string;
  menuType: MenuType;
  text: string;
  quantity?: number;
  showIcon: boolean;
  Icon:
    | (OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
        muiName: string;
      })
    | any;
  handleItemSelect: (item: MenuType) => void;
}

/***********************************************
 *                MAIN METHOD                  *
 **********************************************/
const ItemMenu = ({
  isTitle,
  titleLabel,
  menuType,
  text,
  quantity,
  showIcon,
  Icon,
  handleItemSelect,
}: IProps) => {
  const selectedItem = () => {
    handleItemSelect(menuType);
  };

  return (
    <>
      {isTitle && (
        <Typography
          sx={{
            fontWeight: 400,
            fontSize: "0.9rem",
            fontStyle: "italic",
            mt: 1,
            px: 2,
          }}
        >
          {titleLabel}
        </Typography>
      )}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          background: "inherit",
          my: 2,
          px: 2,

          "&:hover": {
            color: "red",
            cursor: "pointer",
          },
        }}
      >
        <Typography
          sx={{
            marginLeft: "0.5rem",
            fontFamily: "Prompt",
            fontWeight: 400,
          }}
          onClick={selectedItem}
        >
          {text}
        </Typography>

        {showIcon ? (
          <Badge
            badgeContent={quantity}
            sx={{
              "& .MuiBadge-badge": {
                color: "white",
                backgroundColor: clSecondary,
              },
            }}
          >
            <Icon
              fontSize={
                text.toLowerCase().includes("notification") ||
                text.toLowerCase().includes("wishlist") ||
                text.toLowerCase().includes("message")
                  ? "medium"
                  : "small"
              }
              color="inherit"
            />
          </Badge>
        ) : null}
      </Box>
    </>
  );
};

export default ItemMenu;
