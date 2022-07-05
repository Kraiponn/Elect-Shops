import React from "react";
import { useRouter } from "next/router";

// Material design
import { Box, Divider, Typography } from "@mui/material";
import CampaignIcon from '@mui/icons-material/Campaign';
import OutletIcon from '@mui/icons-material/Outlet';

// Global state
import {
  useAppSelector,
  useAppDispatch,
} from "@/features/hooks/use-global-state";

// Components
import TotalOrder from '@/components/shares/navigates/desktop/cart/total-order'

interface IProps {

}

/***********************************************
 *                MAIN METHOD                  *
 **********************************************/
const ListMenu = ({ }: IProps) => {
  const { amount, totalPrice, products } = useAppSelector(state => state.product)

  return (
    <Box
      component="div"
      sx={{}}
    >
      <TotalOrder 
        amount={Number(amount)} 
        totalPrice={totalPrice} 
        Icon={OutletIcon}
      />
    </Box>
  )
}

export default ListMenu