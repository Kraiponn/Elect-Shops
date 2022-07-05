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
export default function AccountItemMenuGroup({ handleItemSelectedType }: IProps) {
  const handleItemSelecte = (item: MenuType) => {
    handleItemSelectedType(item)
  }

  return (
    <>
      <MenuItem
        isTitle={true}
        titleLabel={`Account`}
        menuType={MenuType.ACCOUNT_SETTING}
        text={`Account settings`}
        showIcon={true}
        Icon={ArrowForwardIosIcon}
        handleItemSelect={() => handleItemSelecte(MenuType.ACCOUNT_SETTING)}
      />
      <MenuItem
        isTitle={false}
        menuType={MenuType.PAYMENT_METHOD}
        text={`Payment method`}
        showIcon={true}
        Icon={ArrowForwardIosIcon}
        handleItemSelect={() => handleItemSelecte(MenuType.PAYMENT_METHOD)}
      />
      <MenuItem
        isTitle={false}
        menuType={MenuType.PURCHASE_HISTORY}
        text={`Purchase history`}
        showIcon={true}
        Icon={ArrowForwardIosIcon}
        handleItemSelect={() => handleItemSelecte(MenuType.PURCHASE_HISTORY)}
      />
      <Divider sx={{ my: 2 }} />
    </>
  )
}