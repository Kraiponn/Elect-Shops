import type { NextPage } from "next";
import DefautLayout from "@/components/shares/layouts/defaut-layout";
import { Button, Container } from "@mui/material";

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

        <div>
          <Button
            variant="contained"
            onClick={() => {
              dispatch(increment());
            }}
          >
            Increment
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              dispatch(decrement());
            }}
          >
            Decrement
          </Button>
        </div>
      </Container>
    </DefautLayout>
  );
};

export default Home;
