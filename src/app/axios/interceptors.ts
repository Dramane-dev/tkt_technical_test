import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';

const onAxiosRequest = async (
  config: AxiosRequestConfig
): Promise<AxiosRequestConfig> => config;
const onAxiosRequestError = (error: AxiosError): Promise<AxiosError> =>
  Promise.reject(error);
const onAxiosResponse = (response: AxiosResponse) => response;
const onAxiosResponseError = (error: AxiosError): Promise<AxiosError> =>
  Promise.reject(error);

const setupInterceptorsTo = (axiosInstance: AxiosInstance): AxiosInstance => {
  axiosInstance.interceptors.request.use(onAxiosRequest, onAxiosRequestError);
  axiosInstance.interceptors.response.use(
    onAxiosResponse,
    onAxiosResponseError
  );
  return axiosInstance;
};

export { setupInterceptorsTo };
