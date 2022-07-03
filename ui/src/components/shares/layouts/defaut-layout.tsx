import React from "react";
import Head from "next/head";
import TopNavigation from "@/components/shares/navigates/main/top-navigation";
import MyDialog from "@/components/shares/loader/my-dialog";

interface IProps {
  children: React.ReactNode;
  title: string;
  description?: string;
}

const DefautLayout = ({ children, title, description }: IProps) => {
  const handleToggleDialog = () => {
    console.log("Ok backdrop is close");
  };

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
