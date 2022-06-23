import type { GetStaticProps, NextPage } from "next";
import { Button, Container } from "@mui/material";

// Components
import DefautLayout from "@/components/shares/layouts/defaut-layout";

// Service
import { http } from "@/features/services/http";

// Global state
import {
  useAppSelector,
  useAppDispatch,
} from "@/features/hooks/use-global-state";
import { decrement, increment } from "@/features/global-state";

const Home: NextPage = () => {
  const dispatch = useAppDispatch();
  const { value } = useAppSelector((state) => state.counter);

  return (
    <DefautLayout title="home page">
      <Container>
        <h1>Home Page: {value ? value : 0}</h1>
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
