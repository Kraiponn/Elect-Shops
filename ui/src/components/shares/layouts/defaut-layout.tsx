import React from "react";
import Head from "next/head";
import Cookies from "js-cookie";

// Global state
import {
  useAppSelector,
  useAppDispatch,
} from "@/features/hooks/use-global-state";
import { setAuthSuccess } from "@/features/global-state/reducers/auth";

// Components
import TopNavigation from "@/components/shares/navigates/top-navigation";
import Footer from "@/components/shares/footer";
import MyDialog from "@/components/shares/loader/my-dialog";
import { Box } from "@mui/material";

interface IProps {
  children: React.ReactNode;
  title: string;
  description?: string;
}

const DefautLayout = ({ children, title, description }: IProps) => {
  const dispatch = useAppDispatch();
  const { user, access_token } = useAppSelector((state) => state.auth);
  const { isLoading, isSuccess, isError } = useAppSelector(
    (state) => state.product
  );

  if (!user && !access_token) {
    const _user = Cookies.get("user");
    const _accessToken = Cookies.get("access_token");

    if (_user && _accessToken) {
      dispatch(
        setAuthSuccess({ user: JSON.parse(_user), access_token: _accessToken })
      );
    }
  }

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <title>{title}</title>
        <meta name={title} content={description ? description : ""} />
      </Head>

      <MyDialog
        type="LOADING"
        isShow={isLoading}
        toggleDialogState={() => {}}
      />

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
