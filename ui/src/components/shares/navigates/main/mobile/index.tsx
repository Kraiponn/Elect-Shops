import React from 'react'

// Material design
import { Box, IconButton, keyframes } from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear';

// Components
import AccountDeail from '@/components/shares/navigates/main/account/account-detail'
import MobileListMenu from '@/components/shares/navigates/main/mobile/list-menu';

const menuAnimate = keyframes`
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0.55;
    transform: translateX(10%);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
    left: 0;
  }
`

const exitButtonAnimate = keyframes`
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0.55;
    transform: scale(1.3);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`

interface IProps {
  showMenu: boolean;
}

/***********************************************
 *                MAIN METHOD                  *
 **********************************************/
const MobileMenu = ({ showMenu }: IProps) => {

  return showMenu ? (
    <Box sx={{
      position: 'fixed',
      top: '0',
      left: '0',
      zIndex: 1500,
      width: '100%',
      height: '100%',
      background: 'rgba(0, 0, 0, 0.89)',
    }} >
      <Box sx={{
        position: 'absolute',
        top: '0',
        left: '-100%',
        // left: '0%',
        zIndex: 1501,
        width: '45%',
        height: '100vh',
        background: 'rgba(255, 255, 255, 1)',
        color: 'inherit',
        boxShadow: '0 0.1rem 0.2rem inherit',
        // p: 1,

        opacity: 0,
        animation: `${menuAnimate} .45s forwards ease-out`,
      }}>
        <IconButton
          sx={{
            position: 'absolute',
            top: '2%',
            left: '105%',
            opacity: 0,
            transform: 'scale(0)',
            animation: `${exitButtonAnimate} 0.3s 0.55s linear forwards`,
            background: 'rgba(255, 255, 255, 1)',

            "&:hover": {
              background: 'rgba(255, 255, 255, 0.5)'
            }
          }}
          size='large'>
          <ClearIcon color='inherit' />
        </IconButton>

        <MobileListMenu />
      </Box>

    </Box >)
    : null;
}


export default MobileMenu