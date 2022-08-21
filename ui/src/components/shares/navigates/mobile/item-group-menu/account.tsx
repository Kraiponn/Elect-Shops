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
export default function AccountItemMenuGroup({
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
        titleLabel={t("drawerMenu.account.title")}
        text={t("drawerMenu.account.setting")}
        menuType={MenuType.ACCOUNT_SETTING}
        showIcon={true}
        Icon={ArrowForwardIosIcon}
        handleItemSelect={() => handleItemSelecte(MenuType.ACCOUNT_SETTING)}
      />
      <MenuItem
        isTitle={false}
        text={t("drawerMenu.account.payment")}
        menuType={MenuType.PAYMENT_METHOD}
        showIcon={true}
        Icon={ArrowForwardIosIcon}
        handleItemSelect={() => handleItemSelecte(MenuType.PAYMENT_METHOD)}
      />
      <MenuItem
        isTitle={false}
        text={t("drawerMenu.account.purchase")}
        menuType={MenuType.PURCHASE_HISTORY}
        showIcon={true}
        Icon={ArrowForwardIosIcon}
        handleItemSelect={() => handleItemSelecte(MenuType.PURCHASE_HISTORY)}
      />
      <Divider sx={{ my: 2 }} />
    </>
  );
}
