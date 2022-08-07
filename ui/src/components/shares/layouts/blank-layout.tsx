import React from "react";
import Head from "next/head";

// Global State
// import { useAppDispatch } from "@/features/hooks/use-global-state";
// import { closeAccountMenu } from "@/features/global-state/reducers/gui";

// Components & Material design
import MyDialog from "@/components/shares/loader/my-dialog";

interface IProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  isLoading: boolean;
}

/***********************************************************************************
 *                          ---   MAIN FUNCTION   ---                              *
 **********************************************************************************/
const BlankLayout = ({ children, title, description, isLoading }: IProps) => {
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
