import React from "react";
import Image from "next/image";

// Material design
import { Typography, Box, Divider, Card, CardMedia, CardContent, CardActions, Button, Grid } from "@mui/material";

// Styles
// import { Carousel } from "react-responsive-carousel";
// import styled from "@/assets/styles/Home.module.css";

// Types
import { IProduct } from "@/features/types";

interface IProps {
  products: IProduct[];
}

const styles = {
  media: {
    // height: 0,
    // paddingTop: '56.25%', // 16:9,
    // marginTop: '30'
    backgroundSize: 'auto',
    objectFit: 'cover',
  }
};

/***********************************************
 *                MAIN METHOD                  *
 **********************************************/
export default function Content({ products }: IProps) {
  return (
    <Box sx={{
      py: 2,
      px: 2,
    }}>
      <Typography variant="h2" component="h2">{`New a arrival`}</Typography>
      <Divider sx={{ mb: 2 }} />

      <Grid container spacing={5}>
        {products.map(product => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <Card sx={{ maxWidth: 345, height: '400px' }}>
              <CardMedia
                component="img"
                height="200px"
                image={product.image_url}
                alt={product.product_name}
                sx={{
                  backgroundSize: '100%',
                  objectFit: 'contain',
                  backgroundColor: 'rgba(0, 0, 0, 1)'
                }}
              />

              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {product.product_name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.description}
                </Typography>
              </CardContent>

              <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}