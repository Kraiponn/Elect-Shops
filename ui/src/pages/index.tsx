import type { GetStaticProps, NextPage } from "next";
import { Container } from "@mui/material";

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
