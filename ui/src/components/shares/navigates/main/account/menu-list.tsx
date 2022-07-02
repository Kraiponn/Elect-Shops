import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";

// Material design
import { Box, Divider, Typography } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LogoutIcon from "@mui/icons-material/Logout";

// Global state
import {
  useAppSelector,
  useAppDispatch,
} from "@/features/hooks/use-global-state";
import { systemLogout } from "@/features/global-state/reducers/auth";

// Components
import AccountDetail from "@/components/shares/navigates/main/account/account-detail";

/***********************************************
 *                MAIN METHOD                  *
 **********************************************/
const MenuList = () => {
  const router = useRouter();
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleSystemLogout = () => {
    dispatch(systemLogout());

    router.push("/auth/login");
  };

  return (
    <>
      <AccountDetail
        user_name={user?.user_name}
        email={user?.email}
        image_url={user?.image_url}
      />

      <Divider sx={{ my: 2 }} />

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 1,
          "&:hover": {
            color: "red",
          },
        }}
      >
        <SettingsIcon color="inherit" />
        <Typography
          sx={{
            fontFamily: "PropmptMedium",
            fontSize: "1rem",
            ml: 1,
          }}
        >
          {`Account settings`}
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 1,
          "&:hover": {
            color: "red",
          },
        }}
      >
        <AttachMoneyIcon color="inherit" />
        <Typography
          sx={{
            fontFamily: "PropmptMedium",
            fontSize: "1rem",
            ml: 1,
          }}
        >
          {`Payment methods`}
        </Typography>
      </Box>
      
      <Divider sx={{ my: 2 }} />

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 1,
          "&:hover": {
            color: "red",
          },
        }}
      >
        <LogoutIcon color="inherit" />
        <Typography
          onClick={handleSystemLogout}
          sx={{
            fontFamily: "PropmptMedium",
            fontSize: "1rem",
            ml: 1,
          }}
        >
          {`Log Out`}
        </Typography>
      </Box>
    </>
  );
};

export default MenuList;
