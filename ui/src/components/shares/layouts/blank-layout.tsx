import React from "react";
import Head from "next/head";
import Cookies from "js-cookie";

// Global state
import {
  useAppSelector,
  useAppDispatch,
} from "@/features/hooks/use-global-state";
import { setAuthSuccess } from "@/features/global-state/reducers/auth";

// Components & Material design
import MyDialog from "@/components/shares/loader/my-dialog";

interface IProps {
  children: React.ReactNode;
  title: string;
  description?: string;
}

/***********************************************************************************
 *                          ---   MAIN FUNCTION   ---                              *
 **********************************************************************************/
const BlankLayout = ({ children, title, description }: IProps) => {
  const dispatch = useAppDispatch();
  const { user, access_token } = useAppSelector((state) => state.auth);
  const { isLoading } = useAppSelector((state) => state.product);

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
        <meta name={title} content={description ? description : ""} />
        <title>{title}</title>
      </Head>

      <MyDialog
        type="LOADING"
        isShow={isLoading}
        toggleDialogState={() => {}}
      />

      <main>{children}</main>
    </>
  );
};

export default BlankLayout;
