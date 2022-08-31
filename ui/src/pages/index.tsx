import { useEffect } from "react";
import type { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { AxiosError } from "axios";
import { ToastContainer, toast } from "react-toastify";
import Cookies from "js-cookie";

// Material design
import { Box, Toolbar } from "@mui/material";

// Services & Global state
import {
  useAppDispatch,
  useAppSelector,
} from "@/features/hooks/use-global-state";
import { fetchProfileById } from "@/features/global-state/reducers/auth";
import {
  clearStateWithoutProducts,
  clearStateAddToCart,
} from "@/features/global-state/reducers/product";
import { http, getHttpErrorObject } from "@/features/services";
import {
  IProduct,
  IProductResponse,
  IErorrResponseData,
} from "@/features/interfaces";
import { dummyBanner } from "@/features/services/dummy-data";
// import { hotNavigationData } from "@/components/home/home-dummy-data";

// Components
import MyDialog from "@/components/shares/loader/my-dialog";
import DefautLayout from "@/components/shares/layouts/default-layout";
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
 *                   -----   MAIN FUNCTION - CLIENT SIDE   -----                   *
 **********************************************************************************/
const Home = ({ electrics, books, errObj }: IProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLoading, isAddToCart } = useAppSelector((state) => state.product);
  const { access_token } = useAppSelector((state) => state.auth);

  const handleRefreshPage = () => {
    router.reload();
  };

  const onShowToastify = () => {
    toast.success("Product added is successfully.", {
      autoClose: 1000,
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  //############################################
  //             LIFE CYCLE METHOD
  //############################################
  useEffect(() => {
    if (!access_token) {
      const _accessToken = Cookies.get("access_token");

      if (_accessToken) {
        dispatch(fetchProfileById());
      }
    }

    if (isAddToCart) {
      onShowToastify();
      dispatch(clearStateAddToCart());
    }

    return () => {
      dispatch(clearStateWithoutProducts());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAddToCart]);

  if (errObj) {
    return (
      <ErrorShow errorObject={errObj} handleRefreshPage={handleRefreshPage} />
    );
  }

  return (
    <DefautLayout title="home" description="welcome to shoping">
      <Toolbar />
      <ToastContainer />
      <MyDialog
        type="LOADING"
        isShow={isLoading}
        toggleDialogState={() => {}}
      />

      {dummyBanner ? <BannerSlider dummyBanner={dummyBanner} /> : <div></div>}
      {/* {matches && <HotNavigation categories={hotNavigationData} />} */}

      <Box
        sx={{
          width: "30%",
          margin: "0 auto",
          marginTop: "5rem",
          borderTop: "0.1rem solid #0101011b",
        }}
      />

      <Content electrics={electrics} books={books} />
    </DefautLayout>
  );
};

/***********************************************************************************
 *                       ---   SERVER SIDE PART   ---                              *
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
