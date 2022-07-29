import React from "react";

// Material design
import { Box } from "@mui/material";
import OutletIcon from "@mui/icons-material/Outlet";

// Global state
import { useAppSelector } from "@/features/hooks/use-global-state";

// Components
import TotalOrder from "@/components/shares/navigates/desktop/cart/total-order";
import ProductItem from "@/components/shares/navigates/desktop/cart/item-menu";

/***********************************************************************************
 *                          ---   MAIN FUNCTION   ---                              *
 **********************************************************************************/
const ListMenu = () => {
  const { quantity, totalPrice, orders } = useAppSelector(
    (state) => state.product
  );

  return (
    <Box
      className="list-menu_cart"
      component="div"
      sx={{
        position: "relative",
        left: 0,
        top: 0,
        display: "flex",
        flexDirection: "column",
        height: "auto",
        width: "100%",
        maxHeight: "25rem",
        overflowY: "auto",
      }}
    >
      {quantity && orders
        ? orders.map((order, index) => {
            return (
              <ProductItem
                key={index}
                id={order.product.id}
                product_name={order.product.product_name as string}
                description={order.product.description as string}
                unit_price={Number(order.product.unit_price)}
                image_url={order.product.image_url as string}
              />
            );
          })
        : null}

      <TotalOrder
        quantity={Number(quantity)}
        totalPrice={totalPrice}
        Icon={OutletIcon}
      />
    </Box>
  );
};

export default ListMenu;
