import { useEffect } from "react";
import { useRouter } from "next/router";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { requireAuthentication } from "@/features/services/secure/require-auth";

// Global state and Global types
import { useAppSelector } from "@/features/hooks/use-global-state";

// Material design
import { Toolbar } from "@mui/material";

// Components
import BlankLayout from "@/components/shares/layouts/blank-layout";
import Navigation from "@/components/product/checkout/navbar";
import Content from "@/components/product/checkout/content";

interface IProps {
  // cookies: string;
}

/***********************************************************************************
 *                   -----   MAIN FUNCTION - CLIENT SIDE   -----                   *
 **********************************************************************************/
const Checkout = ({}: IProps) => {
  const router = useRouter();
  const { orders } = useAppSelector((state) => state.product);

  useEffect(() => {
    if (orders.length === 0 || !orders) {
      return router.back();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orders]);

  return (
    <BlankLayout title="content" description="checkout page">
      <Navigation />
      <Toolbar />
      <Content />
    </BlankLayout>
  );
};

export const getServerSideProps: GetServerSideProps = requireAuthentication(
  async (ctx: GetServerSidePropsContext) => {
    return {
      props: {
        // cookies: ctx.req.headers.cookie,
      },
    };
  }
);

export default Checkout;
