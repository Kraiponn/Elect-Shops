import React from 'react'
import Image from "next/image";

// Material design
import { Box, Divider, Typography } from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LogoutIcon from '@mui/icons-material/Logout';

import Logo from "@/assets/images/little-pug-dog.webp";

/***********************************************
 *                MAIN METHOD                  *
 **********************************************/
const MenuList = () => {
  return (
    <>
      <div>
        <Box sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}>
          <Box
            component="div"
            sx={{
              position: 'relative',
              width: '2.5rem',
              height: '2.5rem',
              marginRight: '0.55rem'
            }}>
            <Image
              className="account-logo"
              src={Logo}
              alt="logo"
              layout="fill"
              objectFit="contain"
            />
          </Box>
          <div>
            <Typography
              sx={{
                fontSize: '1rem',
              }}
              variant="subtitle1"
            >{`Kraipon Najaroon`}</Typography>
            <Typography
              variant="body2">
              {`kraipon@gmail.com`}
            </Typography>
          </div>
        </Box>

      </div>{/* Account Name */}
      <Divider sx={{ my: 2 }} />

      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        mb: 1,
        "&:hover": {
          color: 'red',
        }
      }}>
        <SettingsIcon color="inherit" />
        <Typography
          sx={{
            fontFamily: 'PropmptMedium',
            fontSize: '1rem',
            ml: 1,
          }}
        >
          {`Account settings`}
        </Typography>
      </Box>

      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        mb: 1,
        "&:hover": {
          color: 'red',
        }
      }}>
        <AttachMoneyIcon color="inherit" />
        <Typography
          sx={{
            fontFamily: 'PropmptMedium',
            fontSize: '1rem',
            ml: 1,
          }}
        >
          {`Payment methods`}
        </Typography>
      </Box>
      <Divider sx={{ my: 2 }} />

      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        mb: 1,
        "&:hover": {
          color: 'red',
        }
      }}>
        <LogoutIcon color="inherit" />
        <Typography
          sx={{
            fontFamily: 'PropmptMedium',
            fontSize: '1rem',
            ml: 1,
          }}
        >
          {`Log Out`}
        </Typography>
      </Box>
    </>
  )
}

export default MenuList