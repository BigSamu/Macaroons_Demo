import axios from 'axios';
import { API_URL } from '../config';
import http from 'http';

const baseService = (options = {}) => {
  const { headers = {}, params = {} } = options;
  const baseServiceDefault = axios.create({
    baseURL: `${API_URL}`,
    httpAgent: new http.Agent({ family: 4 }),
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    params: { ...params },
    withCredentials: true,
  });

  baseServiceDefault.interceptors.response.use(
    (response) => {
      // Return unwrapped response ---the "body" of it
      return response.data;
    },
    (error) => {
      // Return Error to be handled by React Component
      return Promise.reject(error);
    }
  );

  return baseServiceDefault;
};

export { baseService };
