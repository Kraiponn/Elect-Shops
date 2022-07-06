import Image from "next/image";
import React from "react";

import { cmlProducts } from "@/features/services/dummy-data";
import { Box } from "@mui/material";

type Props = {};

const About = (props: Props) => {
  return (
    <Box className="my-container">
      <Box
        className="img-container"
        sx={{
          width: "100%",
          height: "400px",
          position: "relative",
          marginTop: "100px",
        }}
      >
        <Image
          className="cml-img"
          src={cmlProducts[1].image_url}
          alt={cmlProducts[1].product_name}
          layout="fill"
          objectFit="initial"
        />
      </Box>
    </Box>
  );
};

export default About;
