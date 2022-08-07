import React, { useState } from "react";
import useTranslation from "next-translate/useTranslation";

// Material Design
import { Box, Divider, Typography } from "@mui/material";

// Icons
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import DescriptionIcon from "@mui/icons-material/Description";

// Components
import ManageItemMenu from "@/components/dashboard/navigations/text-icon-item-menu";

// Types
import {
  NavMenuType,
  ISidebarMenuState,
} from "@/components/dashboard/utils/types";

interface IProps {
  handleSelectItemMenu: (menuType: NavMenuType) => void;
  currentItem: ISidebarMenuState;
}

/***********************************************************************************
 *                          ---   MAIN FUNCTION   ---                              *
 **********************************************************************************/
export default function MangementListMenu({
  handleSelectItemMenu,
  currentItem,
}: IProps) {
  const { t } = useTranslation("dashboard");

  return (
    <>
      <Box
        sx={{
          width: "100%",
          padding: "0.5rem",
          "&:hover": {
            cursor: "pointer",
          },
        }}
      >
        {/***************  Title Categories  ***************/}
        <Typography
          sx={{
            fontFamily: "Prompt",
            fontSize: "0.89rem",
            fontWeight: 500,
            opacity: 0.5,
            my: 1,
          }}
        >
          {t("leftSideNav.manage")}
        </Typography>

        {/***************  Customers Item Menu  ***************/}
        <ManageItemMenu
          text={t("leftSideNav.customer")}
          menuType="title"
          Icon={PeopleIcon}
          handleSelectItemMenu={handleSelectItemMenu}
          itemSelectType={NavMenuType.CUSTOMER}
          isActive={currentItem.customers ? true : false}
        />

        {/***************  Product Item Menu  ***************/}
        <ManageItemMenu
          text={t("leftSideNav.product")}
          menuType="title"
          Icon={ShoppingBasketIcon}
          handleSelectItemMenu={handleSelectItemMenu}
          itemSelectType={NavMenuType.PRODUCT}
          isActive={currentItem.products ? true : false}
        />

        {/***************  Order Item Menu  ***************/}
        <ManageItemMenu
          text={t("leftSideNav.order")}
          menuType="title"
          Icon={ShoppingCartIcon}
          handleSelectItemMenu={handleSelectItemMenu}
          itemSelectType={NavMenuType.ORDER}
          isActive={currentItem.orders ? true : false}
        />

        {/***************  Invoice Item Menu  ***************/}
        <ManageItemMenu
          text={t("leftSideNav.invoice")}
          menuType="title"
          Icon={DescriptionIcon}
          handleSelectItemMenu={handleSelectItemMenu}
          itemSelectType={NavMenuType.INVOICE}
          isActive={currentItem.invoices ? true : false}
        />
      </Box>
      <Divider />
    </>
  );
}
