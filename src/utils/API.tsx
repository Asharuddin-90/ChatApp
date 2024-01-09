import axios, {AxiosResponse} from 'axios';
import {API_ENDPOINT} from './config';

class API {
  async fetchData(url: string): Promise<any> {
    try {
      const response: AxiosResponse<any> = await axios.get(
        `${API_ENDPOINT}/${url}`,
      );
      return response.data;
    } catch (error: any) {
      throw new Error(`Failed to fetch data: ${error.message}`);
    }
  }

  async sendData(url: string, data: any): Promise<any> {
    try {
      const response: AxiosResponse<any> = await axios.post(
        `${API_ENDPOINT}/${url}`,
        data,
      );
      console.log('nana', `${API_ENDPOINT}${url}`);
      return response.data;
    } catch (error: any) {
      console.log('tada', JSON.stringify(error, null, 2));
      throw new Error(`Failed to send data: ${error.message}`);
    }
  }

  async updateData(url: string, data: any): Promise<any> {
    try {
      const response: AxiosResponse<any> = await axios.put(
        `${API_ENDPOINT}/${url}`,
        data,
      );
      return response.data;
    } catch (error: any) {
      throw new Error(`Failed to update data: ${error.message}`);
    }
  }

  async deleteData(url: string): Promise<any> {
    try {
      const response: AxiosResponse<any> = await axios.delete(
        `${API_ENDPOINT}/${url}`,
      );
      return response.data;
    } catch (error: any) {
      throw new Error(`Failed to delete data: ${error.message}`);
    }
  }
}

export default API;
