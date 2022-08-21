import useTranslation from "next-translate/useTranslation";

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

/***********************************************************************************
 *                                MAIN FUNCTION                                    *
 **********************************************************************************/
export default function AlertItemMenuGroup({ handleItemSelectedType }: IProps) {
  const { t } = useTranslation("common");

  const handleItemSelecte = (item: MenuType) => {
    handleItemSelectedType(item);
  };

  return (
    <>
      <MenuItem
        isTitle={true}
        titleLabel={t("drawerMenu.alert.title")}
        text={t("drawerMenu.alert.notify")}
        menuType={MenuType.NOTIFICATION}
        showIcon={true}
        quantity={7}
        Icon={NotificationsIcon}
        handleItemSelect={() => handleItemSelecte(MenuType.NOTIFICATION)}
      />
      <MenuItem
        text={t("drawerMenu.alert.message")}
        isTitle={false}
        menuType={MenuType.MESSAGE}
        showIcon={true}
        quantity={8}
        Icon={EmailIcon}
        handleItemSelect={() => handleItemSelecte(MenuType.MESSAGE)}
      />
      <MenuItem
        text={t("drawerMenu.alert.wishlist")}
        isTitle={false}
        menuType={MenuType.WISHLIST}
        showIcon={true}
        quantity={9}
        Icon={FavoriteIcon}
        handleItemSelect={() => handleItemSelecte(MenuType.WISHLIST)}
      />
      <Divider sx={{ my: 2 }} />
    </>
  );
}
