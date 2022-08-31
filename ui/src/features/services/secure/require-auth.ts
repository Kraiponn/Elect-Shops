import { GetServerSideProps, GetServerSidePropsContext } from "next";

interface IRedirect {
  permanent: boolean;
  destination: string;
}

const redirect: IRedirect = {
  permanent: false,
  destination: "/auth/login",
};

/***********************************************************************************
 *                     -----   HIGHER ORDER FUNCTION   -----                       *
 **********************************************************************************/
export function requireAuthentication(gssp: GetServerSideProps) {
  return async (ctx: GetServerSidePropsContext) => {
    const { req } = ctx;

    if (req.headers.cookie) {
      // const cookies = req.headers.cookie.split(";");
      const accessToken = req.headers.cookie.includes("access_token");
      // console.log("AccessToken:User", accessToken, cookies);

      try {
        if (!accessToken) {
          // console.log("No access token...");
          return {
            redirect,
          };
        }
      } catch (error) {
        return {
          redirect,
        };
      }
    } else {
      return {
        redirect,
      };
    }

    return await gssp(ctx);
  };
}
