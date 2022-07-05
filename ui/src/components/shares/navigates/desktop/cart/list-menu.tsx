import React from "react";

// Material design
import { Box } from "@mui/material";
import OutletIcon from "@mui/icons-material/Outlet";

// Global state
import { useAppSelector } from "@/features/hooks/use-global-state";

// Components
import TotalOrder from "@/components/shares/navigates/desktop/cart/total-order";
import ProductItem from "@/components/shares/navigates/desktop/cart/item-menu";
import { cmlProducts } from "@/features/services/dummy-data";

interface IProps {}

/***********************************************
 *                MAIN METHOD                  *
 **********************************************/
const ListMenu = ({}: IProps) => {
  const { amount, totalPrice, products } = useAppSelector(
    (state) => state.product
  );
  // const { product_name, description } = products[0];

  return (
    <Box
      component="div"
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      {amount && cmlProducts
        ? cmlProducts.map((product, index) => {
            return (
              <ProductItem
                key={index}
                product_name={product.product_name as string}
                description={product.description as string}
                unit_price={Number(product.unit_price)}
                image_url={product.image_url as string}
              />
            );
          })
        : null}

      <TotalOrder
        amount={Number(amount)}
        totalPrice={totalPrice}
        Icon={OutletIcon}
      />
    </Box>
  );
};

export default ListMenu;
