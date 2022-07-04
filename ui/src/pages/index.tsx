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

const Home: NextPage = () => {

  return (
    <DefautLayout title="home page">
      <Container>
        <h1>Home Page:</h1>
        <br />
        <Button variant="contained" onClick={() => Cookies.set('access_token', 'my-token')}>Set cookie</Button>
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
