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

/***********************************************************************************
 *                          ---   MAIN FUNCTION   ---                              *
 **********************************************************************************/
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
          marginLeft: '0.15rem',
          fontFamily: 'Prompt',
          fontSize: '1.1rem',
          fontWeight: 400,
        }}
        onClick={selectedItem}
      >
        {title}
      </Typography>
    </Box>
  )
}

export default ItemMenu