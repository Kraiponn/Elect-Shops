import { useEffect } from "react";
import type { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { AxiosError } from "axios";

// Material design
import { Box, Toolbar } from "@mui/material";

// Services & Global state
import {
  useAppDispatch,
  useAppSelector,
} from "@/features/hooks/use-global-state";
import { clearStateWithoutProducts } from "@/features/global-state/reducers/product";
import { http, getHttpErrorObject } from "@/features/services";
import {
  IProduct,
  IProductResponse,
  IErorrResponseData,
} from "@/features/types";
import { dummyBanner } from "@/features/services/dummy-data";
// import { hotNavigationData } from "@/components/home/home-dummy-data";

// Components
import DefautLayout from "@/components/shares/layouts/defaut-layout";
import BannerSlider from "@/components/home/banner-slider";
import Content from "@/components/home/content";
import ErrorShow from "@/components/errors";
// import HotNavigation from "@/components/home/hot-navigation";

interface IProps {
  electrics: IProduct[];
  books: IProduct[];
  errObj?: IErorrResponseData;
}

/***********************************************************************************
 *                         MAIN FUNCTION - CLIENT SIDE                             *
 **********************************************************************************/
const Home = ({ electrics, books, errObj }: IProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isLoading, isSuccess, isError, pagination, keyword } = useAppSelector(
    (state) => state.product
  );

  const handleRefreshPage = () => {
    router.reload();
  };

  useEffect(() => {
    // console.log("Hello home page");

    return () => {
      // console.log("Home page unmount..");
      dispatch(clearStateWithoutProducts());
    };
  }, [dispatch]);

  if (errObj) {
    return (
      <ErrorShow errorObject={errObj} handleRefreshPage={handleRefreshPage} />
    );
  }

  if (!isLoading && isSuccess && pagination.products.length > 0) {
    router.push({
      pathname: "/search",
      query: {
        keyword: keyword,
      },
    });
  }

  return (
    <DefautLayout title="home" description="welcome to shoping">
      <Toolbar />

      {dummyBanner ? <BannerSlider dummyBanner={dummyBanner} /> : <div></div>}
      {/* {matches && <HotNavigation categories={hotNavigationData} />} */}

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

/***********************************************************************************
 *                             SERVER SIDE PART                                    *
 **********************************************************************************/
export const getStaticProps: GetStaticProps = async () => {
  const controller = new AbortController();

  try {
    const electricsData = await http.get(
      `/products?page=1&limit=12&categoryId=2`,
      {
        signal: controller.signal,
      }
    );
    const booksData = await http.get(`/products?page=2&limit=12&categoryId=3`, {
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
      revalidate: 10,
    };
  } catch (error) {
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
