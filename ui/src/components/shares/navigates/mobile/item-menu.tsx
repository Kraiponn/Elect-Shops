import React from "react";

// Material design
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { Badge, Box, SvgIconTypeMap, Typography } from "@mui/material";
import { MenuType } from "@/components/shares/navigates/enum";

interface IProps {
  isTitle: boolean;
  titleLabel?: string;
  menuType: MenuType;
  text: string;
  amount?: number;
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
  amount,
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
            fontFamily: "PromptRegular",
            fontSize: "0.75rem",
            fontWeight: 500,
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
            fontFamily: "PropmptMedium",
            fontSize: "0.9rem",
            marginLeft: "0.5rem",
          }}
          onClick={selectedItem}
        >
          {text}
        </Typography>

        {showIcon ? (
          <Badge color="secondary" badgeContent={amount}>
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
