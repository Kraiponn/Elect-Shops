import React from "react";

import { Box } from "@mui/material";

import MyModal from "@/components/shares/loader/modal";
import LoadingDialog from "@/components/shares/loader/loading";

interface IProps {
  isShow: boolean;
  type: "MODAL" | "LOADING";
  title?: string;
  description?: string;
  toggleDialogState: () => void;
}

const MyDialog = ({
  type,
  isShow,
  title,
  description,
  toggleDialogState,
}: IProps) => {
  return isShow ? (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        position: "absolute",
        left: 0,
        top: 0,
        zIndex: 100,
        background: "rgba(0, 0, 0, 0.79)",
      }}
      onClick={() => toggleDialogState()}
    >
      {type === "MODAL" ? (
        <MyModal type="ERROR" title={title} description={description} />
      ) : (
        <LoadingDialog />
      )}
    </Box>
  ) : null;
};

export default MyDialog;
