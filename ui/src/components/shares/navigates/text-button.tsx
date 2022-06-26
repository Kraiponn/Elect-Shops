import React from 'react'

import { clRedMain } from '@/features/const/colors';
import { Typography } from '@mui/material';

interface IProps {
  label: string;
  OnClick: () => void;
}

/****************************************************
 *  MAIN METHOD
 */
const TextButton = ({ label, OnClick }: IProps) => {
  const handleClick = () => {
    OnClick()
  }
  return (
    <Typography variant="h5" sx={{
      cursor: 'pointer',
      ":hover": {
        color: clRedMain
      }
    }}
      onClick={handleClick}
    >
      {`${label}`}
    </Typography>
  )
}

export default TextButton