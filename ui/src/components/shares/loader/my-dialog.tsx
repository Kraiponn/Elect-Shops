import React from "react";

import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";

import MyModal from '@/components/shares/loader/modal'
import LoadingDialog from '@/components/shares/loader/loading'

interface IProps {
  isShow: boolean;
  type: "MODAL" | "LOADING";
  title?: string;
  description?: string;
  handleToggleDialog: () => void
}

const MyDialog = ({ type, isShow, title, description, handleToggleDialog }: IProps) => {
  return isShow ? (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        position: "absolute",
        left: 0,
        top: 0,
        zIndex: 100,
        background: "rgba(0, 0, 0, 0.92)",
      }}
      onClick={() => handleToggleDialog()}
    >
      {type === "MODAL" ? (
        <MyModal type="ERROR" title="hi!, Kraipon" description="Welcome back to code maker lab." />
      ) : (
        <LoadingDialog />
      )}
    </Box>
  ) : null;
};

export default MyDialog;
