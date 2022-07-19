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
export default function MostPopularItemMenuGroup({ handleItemSelectedType }: IProps) {
  const handleItemSelecte = (item: MenuType) => {
    handleItemSelectedType(item)
  }

  return (
    <>
      <MenuItem
        isTitle={true}
        titleLabel={`Most popular`}
        menuType={MenuType.ACCOUNT_SETTING}
        text={`Food`}
        showIcon={true}
        Icon={ArrowForwardIosIcon}
        handleItemSelect={() => handleItemSelecte(MenuType.ACCOUNT_SETTING)}
      />
      <MenuItem
        isTitle={false}
        menuType={MenuType.PURCHASE_HISTORY}
        text={`E-book`}
        showIcon={true}
        Icon={ArrowForwardIosIcon}
        handleItemSelect={() => handleItemSelecte(MenuType.ACCOUNT_SETTING)}
      />
      <MenuItem
        isTitle={false}
        menuType={MenuType.PURCHASE_HISTORY}
        text={`Online courses`}
        showIcon={true}
        Icon={ArrowForwardIosIcon}
        handleItemSelect={() => handleItemSelecte(MenuType.ACCOUNT_SETTING)}
      />
      <MenuItem
        isTitle={false}
        menuType={MenuType.PURCHASE_HISTORY}
        text={`Smart farm`}
        showIcon={true}
        Icon={ArrowForwardIosIcon}
        handleItemSelect={() => handleItemSelecte(MenuType.ACCOUNT_SETTING)}
      />
      <MenuItem
        isTitle={false}
        menuType={MenuType.PURCHASE_HISTORY}
        text={`Embedded system`}
        showIcon={true}
        Icon={ArrowForwardIosIcon}
        handleItemSelect={() => handleItemSelecte(MenuType.ACCOUNT_SETTING)}
      />
      <MenuItem
        isTitle={false}
        menuType={MenuType.PURCHASE_HISTORY}
        text={`Graphic design`}
        showIcon={true}
        Icon={ArrowForwardIosIcon}
        handleItemSelect={() => handleItemSelecte(MenuType.ACCOUNT_SETTING)}
      />
      <Divider sx={{ my: 2 }} />
    </>
  )
}