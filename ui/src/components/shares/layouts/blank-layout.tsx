import React from "react";
import Head from "next/head";

interface IProps {
  children: React.ReactNode;
  title: string;
  description?: string;
}

const BlankLayout = ({ children, title, description }: IProps) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <title>{title}</title>
        <meta name={title} content={description ? description : ""} />
      </Head>

      <main>{children}</main>
    </>
  );
};

export default BlankLayout;
