import React from 'react'
import { useRouter } from 'next/router'

import { Badge, Box, IconButton, Toolbar, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import { clYellowMain } from '@/features/const/colors'

// Icons
import MenuIcon from '@mui/icons-material/Menu'
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

// Components
import SearchBox from "@/components/shares/ui/search-box";
import AccountListMenu from "@/components/shares/navigates/main/dropdown-menu";
import TextButton from "@/components/shares/navigates/text-button";

interface IProps {

}

const MobileNav = (props: IProps) => {
  const router = useRouter()

  return (
    <Toolbar sx={{
      width: '100%',
      // display: 'flex',
      // justifyContent: 'space-between'
    }}>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
      >
        <MenuIcon />
      </IconButton>

      <Box sx={{flexGrow: 1}}></Box>

      <SearchBox />

      <IconButton color="inherit" sx={{ marginLeft: '1.2rem' }}>
        <Badge badgeContent={9} color="secondary">
          <ShoppingCartIcon color="inherit" />
        </Badge>
      </IconButton>
    </Toolbar>
  )
}

export default MobileNav