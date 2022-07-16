// Material design
import { Toolbar } from "@mui/material";

// Components
import DefautLayout from "@/components/shares/layouts/defaut-layout";
import Content from "@/components/cart/content";

interface IProps {}

/***********************************************
 *                MAIN METHOD                  *
 **********************************************/
const Cart = ({}: IProps) => {
  return (
    <DefautLayout title="Cart" description="product on your cart">
      <Toolbar />

      <Content />
    </DefautLayout>
  );
};

export default Cart;
