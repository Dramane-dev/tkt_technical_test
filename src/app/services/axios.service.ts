import { Injectable } from '@angular/core';
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import { API_BASE_URL } from '../constants/constants';

@Injectable({
  providedIn: 'root',
})
export class AxiosService {
  constructor() {}

  public getInstance(): AxiosInstance {
    const axiosInstance: AxiosInstance = axios.create({
      baseURL: API_BASE_URL,
      withCredentials: false,
      headers: {},
    });

    this._setupInterceptorsTo(axiosInstance);
    return axiosInstance;
  }

  private _setupInterceptorsTo(axiosInstance: AxiosInstance): AxiosInstance {
    const onAxiosRequest = async (
      config: AxiosRequestConfig
    ): Promise<AxiosRequestConfig> => config;
    const onAxiosRequestError = (error: AxiosError): Promise<AxiosError> =>
      Promise.reject(error);
    const onAxiosResponse = (response: AxiosResponse) => response;
    const onAxiosResponseError = (error: AxiosError): Promise<AxiosError> =>
      Promise.reject(error);

    axiosInstance.interceptors.request.use(onAxiosRequest, onAxiosRequestError);
    axiosInstance.interceptors.response.use(
      onAxiosResponse,
      onAxiosResponseError
    );

    return axiosInstance;
  }
}
