import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

// Global state
import {
  useAppSelector,
  useAppDispatch,
} from "@/features/hooks/use-global-state";
import {
  fetchProducts,
  clearProductState,
  clearStateWithoutProducts,
} from "@/features/global-state/reducers/product";
import { ParsedUrlQuery } from "querystring";

// Components
import { Box, Container, Grid, Toolbar, Typography } from "@mui/material";
import Footer from "@/components/shares/footer";
import DefautLayout from "@/components/shares/layouts/defaut-layout";
import { IProduct } from "@/features/types";
import { clPrimary } from "@/features/const/colors";

interface IProps {
  products: IProduct[],
  keyword: string;
}

/***********************************************
 *               MAIN METHOD
 **********************************************/
const Content = ({ products, keyword }: IProps) => {
  return (
    <Box sx={{
      width: '95%', minHeight: '100vh',
      margin: '2rem'
    }}>
      {/************* Search product result *************/}
      <Box sx={{ marginBottom: '2rem' }}>
        <Typography sx={{
          fontFamily: 'PromptBold',
          fontSize: '2.2rem',
        }}
          component="span"
        >
          {`${products.length} Results for `}
        </Typography>

        <Typography sx={{
          fontFamily: 'PromptBold',
          fontSize: '2.2rem',
          color: clPrimary,
        }}
          component="span"
        >
          {`"${keyword}"`}
        </Typography>
      </Box>

      <Grid container>
        <Grid item xs={12} md={4}></Grid>

        <Grid item xs={12} md={8}>
          {products.map(product => (
            <Box className="card-container" key={product.id} sx={{
              borderBottom: '0.01rem solid rgba(56, 55, 55, 0.4)',
              padding: '1rem',
              width: '100%',
              height: '10rem',
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}>
              {/* Image  */}
              <Box sx={{ width: '30%', height: '100%' }}>
                <Box 
                  className="card-image" 
                  sx={{ 
                      position: 'relative', 
                      width: '12rem', 
                      height: '100%' 
                  }}>
                  <Image
                    src={product.image_url}
                    alt={product.product_name}
                    layout="fill"
                    objectFit="contain"
                  />
                </Box>
              </Box>

              {/* Product title and description */}
              <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                height: '100%',
                marginLeft: '1rem',
              }}>
                <Typography
                  sx={{
                    fontSize: '1.35rem',
                    fontWeight: 500
                  }}>
                  {product.product_name}
                </Typography>

                <Typography
                  sx={{
                    fontFamily: 'PromptLight',
                    fontSize: '1rem',
                    fontWeight: 200
                  }}>
                  {product.description}
                </Typography>
              </Box>
            </Box>
          ))}
        </Grid>
      </Grid>
    </Box>
  )
}

export default Content