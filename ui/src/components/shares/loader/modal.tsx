import React from 'react'
import { Box, Button, Divider, Typography } from '@mui/material'
import WarningIcon from '@mui/icons-material/Warning';
import DangerousIcon from '@mui/icons-material/Dangerous';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import styled from '@/assets/styles/modal.module.css'

interface IProps {
  type: 'SUCCESS' | "WARNING" | "ERROR";
  title?: string;
  description?: string;
}

const Modal = ({ type, title, description }: IProps) => {

  const handleDialogType = () => {
    if (type === "SUCCESS")
      return (<CheckCircleIcon fontSize='large' color='success' />);
    else if (type === "WARNING")
      return (<WarningIcon fontSize='large' color='warning' />);
    else
      return (<DangerousIcon fontSize='large' color='error' />);
  }

  return (
    <div
      className={styled.container}
    >
      <div className={styled['title-msg']}>
        {handleDialogType()}
        <Typography
          sx={{
            ml: 1, 
            fontSize: '1.3rem',
            fontWeight: 'bold',
          }} variant="h4"
        >{title}</Typography>
      </div>
      <Divider />

      <Typography
        sx={{
          my: 2
        }}
      >{description}</Typography>

      <Box sx={{
        textAlign: 'right',
        fontWeight: 'bold'
      }}>
        <Button variant='text' color='secondary'>Exit</Button>
      </Box>
    </div>
  )
}

export default Modal

