import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';

interface ApiRequestType {
  get: (url: string, request?: AxiosRequestConfig) => AxiosPromise;
  delete: (url: string, request?: AxiosRequestConfig) => AxiosPromise;
  post: <T>(url: string, data: T, config?: AxiosRequestConfig) => AxiosPromise;
}

const baseURL = process.env.REACT_APP_API_URL;
const token = process.env.REACT_APP_TOKEN;

const baseInstance = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

baseInstance.interceptors.response.use(({ data }) => data);

const apiRequest: ApiRequestType = {
  get: (url, request) => baseInstance.get(url, request),
  delete: (url, request) => baseInstance.delete(url, request),
  post: (url, data, config) => baseInstance.post(url, data, config),
};

export default apiRequest;
