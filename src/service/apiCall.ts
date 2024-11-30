import axios, { AxiosResponse } from "axios";
import { Base_Url } from "./base_url";

// Define the types for the parameters
type ApiCallMethod = "get" | "post" | "put" | "delete"; // Adjust based on allowed HTTP methods

// Generic interface for API response
interface ApiCallResponse<T> {
  status: boolean;
  message: T;
}

export const apiCall = async <T>(
  method: ApiCallMethod,
  endPoint: string,
  data?: any,
  params?: any,
  is_formdata?: boolean
): Promise<ApiCallResponse<T>> => {
  const headers = {
    "Content-Type": is_formdata ? "multipart/form-data" : "application/json",
    Authorization: "Bearer " + localStorage.getItem("token"),
  };

  const url = Base_Url + endPoint;

  try {
    const res: AxiosResponse = await axios({
      method,
      url,
      params,
      data,
      headers,
    });

    const response: ApiCallResponse<T> = { status: true, message: res.data };
    return response;
  } catch (error: any) {
    if (error?.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login"; // Redirect to login page
    }

    throw new Error(error?.response?.data?.message ?? "Something went wrong");
  }
};
