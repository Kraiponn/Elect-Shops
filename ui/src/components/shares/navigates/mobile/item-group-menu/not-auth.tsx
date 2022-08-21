import useTranslation from "next-translate/useTranslation";

// Material design
import { Divider } from "@mui/material";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import VpnKeyIcon from "@mui/icons-material/VpnKey";

// Components
import MenuItem from "@/components/shares/navigates/mobile/item-menu";
import { MenuType } from "@/components/shares/navigates/enum";

interface IProps {
  handleItemSelectedType: (item: MenuType) => void;
}

/***********************************************************************************
 *                                MAIN FUNCTION                                    *
 **********************************************************************************/
export default function NotAuthItemMenuGroup({
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
        titleLabel={t("drawerMenu.auth.title")}
        menuType={MenuType.REGISTER}
        text={t("drawerMenu.auth.signup")}
        showIcon={true}
        quantity={0}
        Icon={AppRegistrationIcon}
        handleItemSelect={() => handleItemSelecte(MenuType.REGISTER)}
      />
      <MenuItem
        isTitle={false}
        menuType={MenuType.LOGIN}
        text={t("drawerMenu.auth.login")}
        showIcon={true}
        quantity={0}
        Icon={VpnKeyIcon}
        handleItemSelect={() => handleItemSelecte(MenuType.LOGIN)}
      />
      <Divider sx={{ my: 2 }} />
    </>
  );
}
