import React from 'react'
import { Box } from '@mui/material'

import { BallTriangle } from 'react-loader-spinner'
import { clYellow } from "@/features/const/colors";

const Loading = () => {
  return (
    <Box sx={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'Translate(-50%, -50%)',
      width: '20%',
      height: '20vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <BallTriangle color={clYellow} width={'100%'} height={'100%'} />
    </Box>
  )
}

export default Loading