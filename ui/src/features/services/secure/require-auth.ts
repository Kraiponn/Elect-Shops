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
    // console.log("My server check...", req.headers.cookie);

    if (req.headers.cookie) {
      const cookies = req.headers.cookie.split(";");
      const accessToken = cookies[0].includes("access_token");
      const user = cookies[1].includes("user");
      // console.log("AccessToken:User", accessToken, user);

      // console.log("Have a cookie", cookies.length);
      // console.log("cookies addr[0]", cookies[0].includes("access_token="));
      // console.log("cookies addr[1]", cookies[1]);

      try {
        // Send a request to the API and verify that the user exists
        // Reject and redirect if the user is undefined or there is no accessToken

        if (!accessToken || !user) {
          return {
            redirect,
          };
        }
      } catch (error) {
        // Failure in the query or any error should fallback here
        // this route is possibly forbidden means the cookie is invalid
        // or the cookie is expired
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
