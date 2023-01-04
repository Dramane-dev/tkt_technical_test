import axios, { AxiosInstance } from 'axios';
import { API_BASE_URL } from '../constants/constants';
import { setupInterceptorsTo } from './interceptors';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Access-Control-Allow-Origin': '*',
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

setupInterceptorsTo(axiosInstance);

export { axiosInstance };
