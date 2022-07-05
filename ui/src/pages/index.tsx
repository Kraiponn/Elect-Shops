import type { GetStaticProps, NextPage } from "next";
import { Button, Container } from "@mui/material";

import Cookies from "js-cookie";

// Components
import DefautLayout from "@/components/shares/layouts/defaut-layout";

// Global state
import {
  useAppSelector,
  useAppDispatch,
} from "@/features/hooks/use-global-state";
import { addProductToCart, removeProductFromCart } from "@/features/global-state/reducers/product";

const Home: NextPage = () => {
  const dispatch = useAppDispatch()

  return (
    <DefautLayout title="home page">
      <Container>
        <h1>Home Page:</h1>
        <br />
        <Button
          variant="contained"
          onClick={() => Cookies.set('access_token', 'my-token')}
        >
          Set cookie
        </Button>

        <Button
          variant="contained"
          onClick={() => dispatch(addProductToCart())}
        >
          Add to cart
        </Button>

        <Button
          variant="contained"
          onClick={() => dispatch(removeProductFromCart())}
        >
          Remove from cart
        </Button>
      </Container>
    </DefautLayout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};

export default Home;
