import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import {API_ENDPOINT} from './config';
import AsyncStorage from '@react-native-async-storage/async-storage';

class API {
  private axiosInstance: AxiosInstance;

  private excludedEndpoints: string[] = ['auth/login', 'auth/signup'];

  constructor() {
    this.axiosInstance = axios.create();

    // Add request interceptor
    this.axiosInstance.interceptors.request.use(
      async (config: AxiosRequestConfig) => {
        const token = await AsyncStorage.getItem('token');
        if (token && !this.isExcludedEndpoint(config.url)) {
          config.headers = {
            ...config.headers,
            Authorization: `Bearer ${token}`,
          };
        }
        return config as InternalAxiosRequestConfig<any>;
      },
      (error: any) => {
        return Promise.reject(error);
      },
    );
  }

  private isExcludedEndpoint(url: string): boolean {
    for (const endpoint of this.excludedEndpoints) {
      if (url.endsWith(endpoint)) {
        return true;
      }
    }
    return false;
  }
  async fetchData(url: string, headers?: any): Promise<any> {
    try {
      const response: AxiosResponse<any> = await axios.get(
        `${API_ENDPOINT}/${url}`,
        {headers},
      );
      return response.data;
    } catch (error: any) {
      throw new Error(`Failed to fetch data: ${error.message}`);
    }
  }

  async sendData(url: string, data: any, headers?: any): Promise<any> {
    try {
      const response: AxiosResponse<any> = await axios.post(
        `${API_ENDPOINT}/${url}`,
        data,
        {headers},
      );
      console.log('nana', `${API_ENDPOINT}${url}`);
      return response.data;
    } catch (error: any) {
      throw new Error(`Failed to send data: ${error.message}`);
    }
  }

  async updateData(url: string, data: any, headers?: any): Promise<any> {
    try {
      const response: AxiosResponse<any> = await axios.put(
        `${API_ENDPOINT}/${url}`,
        data,
        {headers},
      );
      return response.data;
    } catch (error: any) {
      throw new Error(`Failed to update data: ${error.message}`);
    }
  }

  async deleteData(url: string, headers?: any): Promise<any> {
    try {
      const response: AxiosResponse<any> = await axios.delete(
        `${API_ENDPOINT}/${url}`,
        {headers},
      );
      return response.data;
    } catch (error: any) {
      throw new Error(`Failed to delete data: ${error.message}`);
    }
  }
}

export default API;
