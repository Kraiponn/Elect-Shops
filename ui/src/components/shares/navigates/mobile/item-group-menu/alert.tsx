import React from "react";

// Material design
import { Divider } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import EmailIcon from "@mui/icons-material/Email";
import FavoriteIcon from "@mui/icons-material/Favorite";

// Components
import MenuItem from "@/components/shares/navigates/mobile/item-menu";
import { MenuType } from "@/components/shares/navigates/enum";

interface IProps {
  handleItemSelectedType: (item: MenuType) => void;
}

/***********************************************
 *                MAIN METHOD                  *
 **********************************************/
export default function AlertItemMenuGroup({ handleItemSelectedType }: IProps) {
  const handleItemSelecte = (item: MenuType) => {
    handleItemSelectedType(item)
  }

  return (
    <>
      <MenuItem
        isTitle={true}
        titleLabel={`Alert`}
        menuType={MenuType.NOTIFICATION}
        text={`Notifications`}
        showIcon={true}
        amount={7}
        Icon={NotificationsIcon}
        handleItemSelect={() => handleItemSelecte(MenuType.NOTIFICATION)}
      />
      <MenuItem
        isTitle={false}
        menuType={MenuType.MESSAGE}
        text={`Messages`}
        showIcon={true}
        amount={8}
        Icon={EmailIcon}
        handleItemSelect={() => handleItemSelecte(MenuType.MESSAGE)}
      />
      <MenuItem
        isTitle={false}
        menuType={MenuType.WISHLIST}
        text={`Wishlist`}
        showIcon={true}
        amount={9}
        Icon={FavoriteIcon}
        handleItemSelect={() => handleItemSelecte(MenuType.WISHLIST)}
      />
      <Divider sx={{ my: 2 }} />
    </>
  )
}