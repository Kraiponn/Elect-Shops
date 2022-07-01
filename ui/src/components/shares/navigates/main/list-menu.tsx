import * as React from "react";
import Image from "next/image";

import { Box } from "@mui/material";
import Logo from "@/assets/images/doctor.svg";

interface IProps {
  data: string[];
}

/***********************************************
 *              MAIN METHOD
 */
const ListMenu = ({ data }: IProps) => {
  const handleComponents = () => {
    return data.map((str, index) => {
      return <div key={index}>{`${index}:${str}`}</div>;
    });
  };

  return (
    <>
      <Box
        className="account_list_menu"
        component="div"
        sx={{
          visibility: "hidden",
          background: "rgba(255, 255, 255, 1)",
          color: "black",
          fontSize: ".89rem",
          borderRadius: ".2rem",
          padding: ".3rem",
          textAlign: "left",
          boxShadow: "0 0.1rem 0.2rem 0 black",

          position: "absolute",
          top: "100%",
          right: "0",
          zIndex: 1502,
          width: "14rem",
          marginLeft: "-7rem",

          opacity: 0,
          transform: "scale(0)",
          // transition: "opacity 0.75s",

          "&::after": {
            content: '""',
            position: "absolute",
            bottom: "100%",
            left: "88%",
            zIndex: 1309,
            marginLeft: "-0.75rem",
            borderWidth: "0.75rem",
            borderStyle: "solid",
            borderColor: `transparent transparent white transparent`,
          },
        }}
      >
        <Box
          component="div"
          sx={{
            height: "auto",
            maxHeight: "25rem",
            overflowY: "auto",
            padding: "0.78rem",
          }}
        >
          {/* {handleComponents()} */}
          <Box sx={{}}>
            <Image
              className="account-logo"
              src={Logo}
              alt="logo"
              width={45}
              height={45}
            />
            <div>
              <div>kraipon@gmail.com </div>
              <div>kraipon najaroon</div>
            </div>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ListMenu;
