import { AxiosError } from "axios";

interface IErorrResponseData {
  statusCode: number;
  message: string | string[];
  error: string;
}

export const getHttpErrorMessage = (error: AxiosError) => {
  if (error.response) {
    console.log("RESPONSE ERROR", error.response.data);
    // console.log(error.response.status);
    // console.log(error.response.headers);

    return errorResponseCase(error.response.data as IErorrResponseData);
  } else if (error.request) {
    console.log("REQUEST ERROR", error.request);

    return error.request;
  } else {
    console.log("My Error", error.message);

    return error.message;
  }
};

const errorResponseCase = (err: IErorrResponseData) => {
  switch (err.statusCode) {
    case 500:
      return "Internal server error";
    case 409:
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
