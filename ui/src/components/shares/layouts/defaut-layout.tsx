import React from "react";
import Head from "next/head";
import TopNavigation from "@/components/shares/navigates/top-navigation";

interface IProps {
  children: React.ReactNode;
  title: string;
  description?: string;
}

const DefautLayout = ({ children, title, description }: IProps) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <title>{title}</title>
        <meta name={title} content={description ? description : ""} />
      </Head>

      <TopNavigation />
      <main>{children}</main>
    </>
  );
};

export default DefautLayout;
