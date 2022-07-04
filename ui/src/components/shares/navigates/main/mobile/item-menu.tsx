import React from "react";

// Material design
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { Badge, Box, SvgIconTypeMap, Typography } from "@mui/material";
import { MenuType } from "@/components/shares/navigates/main/enum";

interface IProps {
  isTitle: boolean;
  titleLabel?: string;
  menuType: MenuType;
  text: string;
  amount?: number;
  showIcon: boolean;
  Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  } | any;
  handleSelectedItem: (item: MenuType) => void;
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
  handleSelectedItem }: IProps
) => {
  const selectedItem = () => {
    handleSelectedItem(menuType);
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
          justifyContent: 'space-between',
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
            fontSize: "1rem",
            // color: "black",
            marginLeft: "0.5rem",
          }}
          onClick={selectedItem}
        >
          {text}
        </Typography>

        {showIcon ? (
          <Badge color="secondary" badgeContent={amount}>
            <Icon color="inherit" />
          </Badge>
        ) : null}
      </Box>
    </>
  );
};

export default ItemMenu;
