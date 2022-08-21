import { useRouter } from "next/router";

// Material design and Icons
import { IconButton, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";

// Global state and Types
import { useAppDispatch } from "@/features/hooks/use-global-state";
import { openMobileMenu } from "@/features/global-state/reducers/gui";

// Components
import MobileMenu from "@/components/shares/navigates/mobile";
import SearchProductBox from "@/components/shares/ui/search-product-box";
import CartMenu from "@/components/shares/navigates/desktop/cart";

interface IProps {}

/***********************************************************************************
 *                                MAIN FUNCTION                                    *
 **********************************************************************************/
const MobileNav = ({}: IProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleOpenMobileMenu = () => {
    dispatch(openMobileMenu());
  };

  return (
    <>
      <MobileMenu />

      <Toolbar
        sx={{
          width: "100%",
        }}
      >
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={handleOpenMobileMenu}
        >
          <MenuIcon fontSize="large" />
        </IconButton>

        <SearchProductBox />

        <CartMenu />

        <IconButton
          size="large"
          edge="end"
          color="inherit"
          aria-label="home"
          onClick={() => router.push("/", "/", { locale: router.locale })}
        >
          <HomeIcon fontSize="large" />
        </IconButton>
      </Toolbar>
    </>
  );
};

export default MobileNav;
