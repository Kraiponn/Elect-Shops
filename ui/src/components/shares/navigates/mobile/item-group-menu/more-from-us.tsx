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
export default function MoreFromUsItemMenuGroup({
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
        titleLabel={t("drawerMenu.moreFromUs.title")}
        text={t("drawerMenu.moreFromUs.getApp")}
        menuType={MenuType.GET_THE_APP}
        showIcon={true}
        Icon={ArrowForwardIosIcon}
        handleItemSelect={() => handleItemSelecte(MenuType.GET_THE_APP)}
      />
      <MenuItem
        isTitle={false}
        text={t("drawerMenu.moreFromUs.invite")}
        menuType={MenuType.INVITE_FRIENDS}
        showIcon={true}
        Icon={ArrowForwardIosIcon}
        handleItemSelect={() => handleItemSelecte(MenuType.INVITE_FRIENDS)}
      />
      <MenuItem
        isTitle={false}
        text={t("drawerMenu.moreFromUs.help")}
        menuType={MenuType.HELP}
        showIcon={true}
        Icon={ArrowForwardIosIcon}
        handleItemSelect={() => handleItemSelecte(MenuType.HELP)}
      />
      <Divider sx={{ my: 2 }} />
    </>
  );
}
