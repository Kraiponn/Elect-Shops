import React from 'react'
import { useRouter } from 'next/router'

import { Badge, Box, IconButton, Toolbar, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import { clYellowMain } from '@/features/const/colors'

// Icons
import HomeIcon from '@mui/icons-material/Home';
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

// Components
import SearchBox from "@/components/shares/ui/search-box";
import AccountListMenu from "@/components/shares/navigates/account-list";
import TextButton from "@/components/shares/navigates/text-button";

interface IProps {

}

const DesktopNav = (props: IProps) => {
  const router = useRouter()

  return (
    <Toolbar>
      <HomeIcon fontSize='large' />
      <Typography
        variant="h5"
        component={motion.div}
        sx={{
          ml: 1,
          flexGrow: 1, cursor: "pointer",
        }}
        onClick={() => router.push("/")}
        whileHover={{
          scale: 1.009,
          color: clYellowMain,
          transition: {
            ease: "linear",
            duration: 0.3,
            yoyo: Infinity,
          },
        }}
      >
        {`CML SHOP`}
      </Typography>

      <SearchBox />

      <IconButton color="inherit" sx={{ marginLeft: '1.2rem' }}>
        <Badge badgeContent={9} color="secondary">
          <ShoppingCartIcon color="inherit" />
        </Badge>
      </IconButton>

      <IconButton color="inherit">
        <Badge badgeContent={1} color="secondary">
          <NotificationsIcon color="inherit" />
        </Badge>
      </IconButton>

      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <IconButton size="large" color="inherit">
          <AccountCircleRoundedIcon
            sx={{
              fontSize: "2rem",
            }}
          />
          <AccountListMenu />
        </IconButton>
        <TextButton
          label={`Log In`}
          OnClick={() => router.push('/auth/signin')}
        />

        <Typography variant="h5" sx={{ p: 1 }}>
          |
        </Typography>

        <TextButton
          label={`Sign Up`}
          OnClick={() => router.push('/auth/signup')}
        />
      </Box>
    </Toolbar>
  )
}

export default DesktopNav