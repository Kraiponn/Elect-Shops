import React from 'react'
import { useRouter } from 'next/router'

import { Badge, Box, IconButton, Toolbar, Typography } from '@mui/material'
import { motion, transform } from 'framer-motion'
import { clYellowMain } from '@/features/const/colors'

// Icons
import HomeIcon from '@mui/icons-material/Home';
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

// Global state
import { useAppSelector } from '@/features/hooks/use-global-state'

// Components
import TextButton from "@/components/shares/navigates/text-button";
import SearchBox from "@/components/shares/ui/search-box";
import AccountSubListMenu from "@/components/shares/navigates/sub-menu/list-menu";

interface IProps {

}

const DesktopNav = (props: IProps) => {
  const router = useRouter()
  const { user } = useAppSelector(state => state.auth)

  return (
    <Toolbar>
      <HomeIcon fontSize='large' />
      <Typography
        variant="h5"
        sx={{
          ml: 1,
          flexGrow: 1, cursor: "pointer",
        }}
        onClick={() => router.push("/")}
      >
        {`CML SHOP`}
      </Typography>

      <SearchBox />

      <IconButton color="inherit" sx={{ marginLeft: '1.2rem' }}>
        <Badge badgeContent={9} color="secondary">
          <ShoppingCartIcon color="inherit" />
        </Badge>
      </IconButton>

      {user ? (
        <IconButton color="inherit">
          <Badge badgeContent={1} color="secondary">
            <NotificationsIcon color="inherit" />
          </Badge>
        </IconButton>)
        : null}

      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <IconButton
          sx={{
            position: 'relative',
            display: 'inline-block',
            zIndex: 1300,
            "&:hover": {
              ".account_list_menu": {
                opacity: 1,
                visibility: 'visible',
                transform: 'scale(1.2)',
              }
            }
          }}
          size="large"
          color="inherit">
          <AccountCircleRoundedIcon
            sx={{
              fontSize: "2rem",
            }}
          />
          <AccountSubListMenu />
        </IconButton>

        {!user && (<>
          <TextButton
            label={`Log In`}
            OnClick={() => router.push('/auth/login')}
          />

          <Typography variant="h5" sx={{ p: 1 }}>
            |
          </Typography>

          <TextButton
            label={`Sign Up`}
            OnClick={() => router.push('/auth/signup')}
          />
        </>)}
      </Box>
    </Toolbar>
  )
}

export default DesktopNav