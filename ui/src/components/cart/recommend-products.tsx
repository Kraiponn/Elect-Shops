// Material design
import { Container, Typography } from "@mui/material";

// Services & Global state
import { useAppSelector } from "@/features/hooks/use-global-state";

// Components
import EmptyCart from "@/components/cart/empty-cart";
import ProductCart from "@/components/cart/product-cart";
import ProductSlider from "@/components/shares/ui/product-list-slider";
import { IProduct } from "@/features/interfaces";

interface IProps {
  products: IProduct[];
}

/***********************************************
 *                MAIN METHOD                  *
 **********************************************/
const RecommendProduct = ({ products }: IProps) => {
  return (
    <ProductSlider
      title={`You might also like`}
      titleFontSize="1.5rem"
      products={products}
    />
  );
};

export default RecommendProduct;
