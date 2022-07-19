import type { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { AxiosError } from "axios";

// Material design
import { Box, Toolbar, useMediaQuery } from "@mui/material";

// Services
import { http, getHttpErrorObject } from "@/features/services";
import {
  IProduct,
  IProductResponse,
  IErorrResponseData,
} from "@/features/types";
import { dummyBanner } from "@/features/services/dummy-data";
import { hotNavigationData } from "@/components/home/home-dummy-data";

// Components
import DefautLayout from "@/components/shares/layouts/defaut-layout";
import BannerSlider from "@/components/home/banner-slider";
import Content from "@/components/home/content";
import HotNavigation from "@/components/home/hot-navigation";
import ErrorShow from "@/components/errors";

interface IProps {
  electrics: IProduct[];
  books: IProduct[];
  errObj?: IErorrResponseData;
}

/***********************************************
 *                MAIN METHOD                  *
 **********************************************/
const Home = ({ electrics, books, errObj }: IProps) => {
  const router = useRouter();
  const matches = useMediaQuery("(min-width:845px)");

  const handleRefreshPage = () => {
    router.reload();
  };

  if (errObj) {
    return (
      <ErrorShow errorObject={errObj} handleRefreshPage={handleRefreshPage} />
    );
  }

  return (
    <DefautLayout title="home" description="welcome to shoping">
      <Toolbar />

      {matches && <HotNavigation categories={hotNavigationData} />}

      {dummyBanner ? <BannerSlider dummyBanner={dummyBanner} /> : <div></div>}

      <Box
        sx={{
          width: "30%",
          margin: "0 auto",
          marginTop: "5rem",
          borderTop: "0.1rem solid gray",
        }}
      />

      <Content electrics={electrics} books={books} />
    </DefautLayout>
  );
};

/*********************************************************
 *                     SERVER PART                       *
 ********************************************************/
export const getStaticProps: GetStaticProps = async () => {
  const controller = new AbortController();

  try {
    const electricsData = await http.get(
      `/products?page=1&limit=12&categoryId=6`,
      { signal: controller.signal }
    );
    const booksData = await http.get(`/products?page=1&limit=12&categoryId=3`, {
      signal: controller.signal,
    });

    // console.log("Response", response.data);
    const electrics: IProductResponse = electricsData.data.products;
    const books: IProductResponse = booksData.data["products"];
    controller.abort();

    return {
      props: {
        electrics,
        books,
      },
    };
  } catch (error) {
    // console.log("My error", error as AxiosError);
    const errResponse = getHttpErrorObject(error as AxiosError);

    return {
      props: {
        electrics: [],
        books: [],
        errObj: errResponse,
      },
    };
  }
};

export default Home;
