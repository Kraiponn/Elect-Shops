import { AxiosError } from "axios";
import { IErorrResponseData } from "@/features/interfaces";

export const getHttpErrorObject = (error: AxiosError) => {
  if (error.code === "ERR_NETWORK" || error.code === "ECONNREFUSED") {
    const errObj = {
      error: "Invalid connection",
      message: "No internet(network) connection or api url is incorrect.",
      statusCode: 500,
    };

    return errObj;
  }

  if (error.response) {
    console.log("RESPONSE ERROR", error.response.data);
    // console.log(error.response.status);
    // console.log(error.response.headers);

    /*****************************************
     * error.response.data =>
     * {
     *    error: string;
     *    message: string | string[]
     *    statusCode: number;
     * }
     ****************************************/

    // return errorResponseCase(error.response.data as IErorrResponseData);
    return error.response.data as IErorrResponseData;
  } else if (error.request) {
    console.log("REQUEST ERROR", error.request);

    return error.request as string;
  } else {
    console.log("My Error", error.message);

    return error.message as string;
  }
};

const errorResponseCase = (err: IErorrResponseData) => {
  switch (err.statusCode) {
    case 500:
      return "Internal server error";
    case 400:
      return "Bad request";
    case 404:
      return "Not found";
    case 403:
      return "Forbidden";
    case 401:
      return "Access denied";
    default:
      return "Bad request";
  }
};
