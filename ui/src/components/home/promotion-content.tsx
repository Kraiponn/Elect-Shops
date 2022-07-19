import React from "react";
import Image from "next/image";

// Material design
import { Box, Grid, Typography } from "@mui/material";

// Slider
import Slider from "react-slick";
import {
  NextButton,
  PreviousButton,
} from "@/components/home/custom-arrow-slider";

// Types and Dummy Data
import {
  primaryActivityData,
  secondaryActivityData,
} from "@/components/home/home-dummy-data";

// Components

interface IProps {
  //   electrics: IProduct[];
  //   books: IProduct[];
}

/***********************************************
 *                MAIN METHOD                  *
 **********************************************/
const Promotion = ({}: IProps) => {
  return (
    <Box sx={{ margin: "4.5rem" }}>
      <Typography variant="h3" sx={{fontWeight: 700, fontSize: '2.2rem'}}>{`Monthly Promotions`}</Typography>

      <Grid container>
        <Grid
          item
          xs={12}
          md={8}
          sx={{ paddingRight: ".55rem", marginTop: "0.75rem" }}
        >
          <Slider
            className="activity-slider"
            autoplay
            slidesToShow={1}
            pauseOnHover
            nextArrow={<NextButton />}
            prevArrow={<PreviousButton />}
          >
            {primaryActivityData.map((activity) => (
              <Box
                key={activity.id}
                sx={{
                  position: "relative",
                  width: "100%",
                  height: "220px",
                  "&:hover": {
                    cursor: "pointer",
                  },
                }}
              >
                <Image
                  src={activity.image}
                  alt={activity.description}
                  layout="fill"
                  objectFit="cover"
                />
              </Box>
            ))}
          </Slider>
        </Grid>

        <Grid item xs={12} md={4}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            {secondaryActivityData.map((activity) => (
              <Box
                key={activity.id}
                sx={{
                  position: "relative",
                  width: "100%",
                  height: "100px",
                  boxShadow: "0 0.1rem 0.2rem black",
                  marginTop: "0.75rem",
                  "&:hover": {
                    cursor: "pointer",
                  },
                }}
              >
                <Image
                  src={activity.image}
                  alt={activity.description}
                  layout="fill"
                  objectFit="cover"
                />
              </Box>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Promotion;
