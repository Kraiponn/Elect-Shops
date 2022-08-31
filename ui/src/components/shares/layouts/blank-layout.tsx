import React from "react";
import Head from "next/head";

interface IProps {
  children: React.ReactNode;
  title: string;
  description?: string;
}

/***********************************************************************************
 *                          ---   MAIN FUNCTION   ---                              *
 **********************************************************************************/
const BlankLayout = ({ children, title, description }: IProps) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta name={title} content={description ? description : ""} />
        <title>{title}</title>
      </Head>

      <main>{children}</main>
    </>
  );
};

export default BlankLayout;
