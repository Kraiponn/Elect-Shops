import React from 'react'

// Material design
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { Box, SvgIconTypeMap, Typography } from "@mui/material";
import { MenuType } from '@/components/shares/navigates/enum';

interface IProps {
  menuType: MenuType;
  title: string;
  Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
  handleSelectedItem: (item: MenuType) => void;
}

/***********************************************
 *                MAIN METHOD                  *
 **********************************************/
const ItemMenu = ({ menuType, title, Icon, handleSelectedItem }: IProps) => {
  const selectedItem = () => {
    handleSelectedItem(menuType);
  }

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        my: 2,
        px: 1,

        "&:hover": {
          color: "red",
          cursor: 'pointer',
        },
      }}
    >
      <Icon color="inherit" />
      <Typography
        sx={{
          fontFamily: "PromptRegular",
          fontSize: "0.89rem",
          marginLeft: '0.15rem',
        }}
        onClick={selectedItem}
      >
        {title}
      </Typography>
    </Box>
  )
}

export default ItemMenu