import { getErrors } from "@/src/shared/lib/get-errors";
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { Toast } from "react-native-toast-notifications";
import getEnvVars from "../../config/env";
import Storage from "../storage/storage";

export interface ResponseAPI<T> {
  statusCode: number;
  data: T;
  message: string | null;
  error: string[] | null;
}

class AxiosClient {
  private axiosInstance: AxiosInstance;
  private static axiosClient: AxiosClient;

  private constructor() {
    this.axiosInstance = axios.create({
      baseURL: getEnvVars()?.API_URL,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    const storage = Storage.getInstance();
    this.axiosInstance.interceptors.request.use(
      async (config) => {
        const token = await storage.getItem("userToken");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        Promise.reject(error);
      }
    );

    this.axiosInstance.interceptors.response.use(
      (response) => {
        console.log();
        return response;
      },
      (error) => {
        if (typeof window !== "undefined") {
          const errors = getErrors([
            error?.response?.data?.message,
            error?.response?.data?.error,
          ]);
          Toast.show(errors || error.message, { type: "danger" });
        } else {
          console.error(error?.response?.data);
        }
        return Promise.reject(error);
      }
    );
  }

  public static getInstance(): AxiosClient {
    if (!this.axiosClient) {
      this.axiosClient = new AxiosClient();
    }
    return this.axiosClient;
  }

  getUri(config?: AxiosRequestConfig): string {
    return this.axiosInstance.getUri(config);
  }

  request<T, R = AxiosResponse<ResponseAPI<T>>, D = unknown>(
    config: AxiosRequestConfig<D>
  ): Promise<R> {
    return this.axiosInstance.request(config);
  }

  get<T, R = AxiosResponse<ResponseAPI<T>>, D = unknown>(
    url: string,
    config?: AxiosRequestConfig<D>
  ): Promise<R> {
    return this.axiosInstance.get(url, config);
  }

  delete<T, R = AxiosResponse<ResponseAPI<T>>, D = unknown>(
    url: string,
    config?: AxiosRequestConfig<D>
  ): Promise<R> {
    return this.axiosInstance.delete(url, config);
  }

  head<T, R = AxiosResponse<ResponseAPI<T>>, D = unknown>(
    url: string,
    config?: AxiosRequestConfig<D>
  ): Promise<R> {
    return this.axiosInstance.head(url, config);
  }

  options<T, R = AxiosResponse<ResponseAPI<T>>, D = unknown>(
    url: string,
    config?: AxiosRequestConfig<D>
  ): Promise<R> {
    return this.axiosInstance.options(url, config);
  }

  post<T, R = AxiosResponse<ResponseAPI<T>>, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Promise<R> {
    return this.axiosInstance.post(url, data, config);
  }

  put<T, R = AxiosResponse<ResponseAPI<T>>, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Promise<R> {
    return this.axiosInstance.put(url, data, config);
  }

  patch<T, R = AxiosResponse<ResponseAPI<T>>, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Promise<R> {
    return this.axiosInstance.patch(url, data, config);
  }

  postForm<T, R = AxiosResponse<ResponseAPI<T>>, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Promise<R> {
    return this.axiosInstance.postForm(url, data, config);
  }

  putForm<T, R = AxiosResponse<ResponseAPI<T>>, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Promise<R> {
    return this.axiosInstance.putForm(url, data, config);
  }

  patchForm<T, R = AxiosResponse<ResponseAPI<T>>, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Promise<R> {
    return this.axiosInstance.patchForm(url, data, config);
  }
}

export default AxiosClient;
