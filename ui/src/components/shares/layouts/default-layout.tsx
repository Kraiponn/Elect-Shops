import React, { useEffect } from "react";
import Head from "next/head";
// import Cookies from "js-cookie";
// import { ToastContainer, toast } from "react-toastify";

// Global state
// import {
//   useAppSelector,
//   useAppDispatch,
// } from "@/features/hooks/use-global-state";
// import { setAuthSuccess } from "@/features/global-state/reducers/auth";
// import { clearStateAddToCart } from "@/features/global-state/reducers/product";

// Components & Material design
import { Box } from "@mui/material";
import TopNavigation from "@/components/shares/navigates/top-navigation";
import Footer from "@/components/shares/footer";
// import MyDialog from "@/components/shares/loader/my-dialog";

interface IProps {
  children: React.ReactNode;
  title: string;
  description?: string;
}

const DefautLayout = ({ children, title, description }: IProps) => {
  // const dispatch = useAppDispatch();
  // const { user, access_token } = useAppSelector((state) => state.auth);
  // const { isAddToCart } = useAppSelector((state) => state.product);
  // const { isLoading } = useAppSelector((state) => state.product);

  // const onShowToastify = () => {
  //   toast.success("Product added is successfully.", {
  //     autoClose: 1000,
  //     position: toast.POSITION.TOP_RIGHT,
  //   });
  // };

  // if (!user && !access_token) {
  //   const _user = Cookies.get("user");
  //   const _accessToken = Cookies.get("access_token");

  //   if (_user && _accessToken) {
  //     dispatch(
  //       setAuthSuccess({ user: JSON.parse(_user), access_token: _accessToken })
  //     );
  //   }
  // }

  // useEffect(() => {
  //   if (isAddToCart) {
  //     onShowToastify();
  //     dispatch(clearStateAddToCart());
  //   }

  //   return () => {
  //     dispatch(clearStateAddToCart());
  //   };

  // }, [isAddToCart]);

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta name={title} content={description ? description : ""} />
        <title>{title}</title>
      </Head>

      {/* <ToastContainer />

      <MyDialog
        type="LOADING"
        isShow={isLoading}
        toggleDialogState={() => {}}
      /> */}
      <TopNavigation />

      <Box
        sx={{
          minHeight: "100vh",
        }}
      >
        {children}
      </Box>

      <Footer />
    </>
  );
};

export default DefautLayout;
