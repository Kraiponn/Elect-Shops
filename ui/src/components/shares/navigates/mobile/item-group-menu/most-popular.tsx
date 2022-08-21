import useTranslation from "next-translate/useTranslation";

// Material design
import { Divider } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

// Components
import MenuItem from "@/components/shares/navigates/mobile/item-menu";
import { MenuType } from "@/components/shares/navigates/enum";

interface IProps {
  handleItemSelectedType: (item: MenuType) => void;
}

/***********************************************************************************
 *                                MAIN FUNCTION                                    *
 **********************************************************************************/
export default function MostPopularItemMenuGroup({
  handleItemSelectedType,
}: IProps) {
  const { t } = useTranslation("common");

  const handleItemSelecte = (item: MenuType) => {
    handleItemSelectedType(item);
  };

  return (
    <>
      <MenuItem
        isTitle={true}
        titleLabel={t("drawerMenu.mostPopular.title")}
        text={t("drawerMenu.mostPopular.food")}
        menuType={MenuType.ACCOUNT_SETTING}
        showIcon={true}
        Icon={ArrowForwardIosIcon}
        handleItemSelect={() => handleItemSelecte(MenuType.ACCOUNT_SETTING)}
      />
      <MenuItem
        isTitle={false}
        text={t("drawerMenu.mostPopular.ebook")}
        menuType={MenuType.PURCHASE_HISTORY}
        showIcon={true}
        Icon={ArrowForwardIosIcon}
        handleItemSelect={() => handleItemSelecte(MenuType.ACCOUNT_SETTING)}
      />
      <MenuItem
        isTitle={false}
        text={t("drawerMenu.mostPopular.onlineCourse")}
        menuType={MenuType.PURCHASE_HISTORY}
        showIcon={true}
        Icon={ArrowForwardIosIcon}
        handleItemSelect={() => handleItemSelecte(MenuType.ACCOUNT_SETTING)}
      />
      <MenuItem
        isTitle={false}
        text={t("drawerMenu.mostPopular.smartFarm")}
        menuType={MenuType.PURCHASE_HISTORY}
        showIcon={true}
        Icon={ArrowForwardIosIcon}
        handleItemSelect={() => handleItemSelecte(MenuType.ACCOUNT_SETTING)}
      />
      <MenuItem
        isTitle={false}
        text={t("drawerMenu.mostPopular.embedded")}
        menuType={MenuType.PURCHASE_HISTORY}
        showIcon={true}
        Icon={ArrowForwardIosIcon}
        handleItemSelect={() => handleItemSelecte(MenuType.ACCOUNT_SETTING)}
      />
      <MenuItem
        isTitle={false}
        text={t("drawerMenu.mostPopular.graphic")}
        menuType={MenuType.PURCHASE_HISTORY}
        showIcon={true}
        Icon={ArrowForwardIosIcon}
        handleItemSelect={() => handleItemSelecte(MenuType.ACCOUNT_SETTING)}
      />
      <Divider sx={{ my: 2 }} />
    </>
  );
}
