import React from "react";

// Material design
import { Divider } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

// Components
import MenuItem from "@/components/shares/navigates/mobile/item-menu";
import { MenuType } from "@/components/shares/navigates/enum";

interface IProps {
  handleItemSelectedType: (item: MenuType) => void;
}

/***********************************************
 *                MAIN METHOD                  *
 **********************************************/
export default function MoreFromUsItemMenuGroup({ handleItemSelectedType }: IProps) {
  const handleItemSelecte = (item: MenuType) => {
    handleItemSelectedType(item)
  }

  return (
    <>
      <MenuItem
        isTitle={true}
        titleLabel={`More from Us`}
        menuType={MenuType.GET_THE_APP}
        text={`Get the app`}
        showIcon={true}
        Icon={ArrowForwardIosIcon}
        handleItemSelect={() => handleItemSelecte(MenuType.GET_THE_APP)}
      />
      <MenuItem
        isTitle={false}
        menuType={MenuType.INVITE_FRIENDS}
        text={`Invite friends`}
        showIcon={true}
        Icon={ArrowForwardIosIcon}
        handleItemSelect={() => handleItemSelecte(MenuType.INVITE_FRIENDS)}
      />
      <MenuItem
        isTitle={false}
        menuType={MenuType.HELP}
        text={`Help`}
        showIcon={true}
        Icon={ArrowForwardIosIcon}
        handleItemSelect={() => handleItemSelecte(MenuType.HELP)}
      />
      <Divider sx={{ my: 2 }} />
    </>
  )
}