import React from "react";

// Material design
import { Box, IconButton } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

// Global state
import {
  useAppSelector,
  useAppDispatch,
} from "@/features/hooks/use-global-state";
import { closeMobileMenu } from "@/features/global-state/reducers/gui";

// Components
import MobileListMenu from "@/components/shares/navigates/main/mobile/list-menu";

// Animations
import {
  backDropStyle,
  openContentMobileMenuStyle,
  closeContentMobileMenuStyle,
  closeMobileButtonMenuStyle,
} from "@/components/shares/navigates/main/mobile/animate";

// interface IProps {
//   showMenu: boolean;
// }

/***********************************************
 *                MAIN METHOD                  *
 **********************************************/
const MobileMenu = () => {
  const { showMobileMenu, menuState } = useAppSelector((state) => state.gui);
  const dispatch = useAppDispatch();

  const handleClosedMobileMenu = () => {
    dispatch(closeMobileMenu());
  };

  if (showMobileMenu && menuState === "NORMAL") {
    return (
      <Box sx={backDropStyle} onClick={handleClosedMobileMenu}>
        <Box sx={openContentMobileMenuStyle}>
          <IconButton
            sx={closeMobileButtonMenuStyle}
            size="large"
            onClick={handleClosedMobileMenu}
          >
            <ClearIcon color="inherit" />
          </IconButton>

          <MobileListMenu />
        </Box>
      </Box>
    );
  } else if (!showMobileMenu && menuState === "CLOSE") {
    return (
      <Box sx={closeContentMobileMenuStyle}>
        <IconButton
          sx={closeMobileButtonMenuStyle}
          size="large"
          onClick={handleClosedMobileMenu}
        >
          <ClearIcon color="inherit" />
        </IconButton>

        <MobileListMenu />
      </Box>
    );
  } else {
    return null;
  }
};

export default MobileMenu;
