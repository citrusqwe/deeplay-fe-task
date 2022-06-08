import axios from 'axios';
import { Head, Worker } from '../types';
import qs from 'qs';

const instance = axios.create({
  baseURL: 'http://localhost:3001',
});

const workersAPI = () => ({
  async getWorkers(filter?: {
    role?: string;
    division?: string;
  }): Promise<Worker[]> {
    try {
      const filterString =
        filter?.role || filter?.division
          ? `?${qs.stringify(filter, {
              filter: (_, value) => value || undefined,
            })}`
          : '';
      const { data } = await instance.get(`/workers${filterString}`);
      return data;
    } catch (error) {
      throw new Error(error as string);
    }
  },
  async createWorker(worker: Worker): Promise<Worker> {
    try {
      const { data } = await instance.post('/workers', worker);
      return data;
    } catch (error) {
      throw new Error(error as string);
    }
  },
  async deleteWorker(id: string): Promise<Worker> {
    try {
      const { data } = await instance.delete(`/workers/${id}`);
      return data;
    } catch (error) {
      throw new Error(error as string);
    }
  },
  async editWorker(values: Worker): Promise<Worker> {
    try {
      const { data } = await instance.put(`/workers/${values.id}`, values);
      return data;
    } catch (error) {
      throw new Error(error as string);
    }
  },
  async getCurrentWorker(id: string) {
    try {
      const { data } = await instance.get(`/workers/${id}`);
      return data;
    } catch (error) {
      throw new Error(error as string);
    }
  },
  async getHeads(): Promise<Head[]> {
    try {
      const { data } = await instance.get(`/heads`);
      return data;
    } catch (error) {
      throw new Error(error as string);
    }
  },
  async createHead(head: Head) {
    try {
      const { data } = await instance.post(`/heads`, head);
      return data;
    } catch (error) {
      throw new Error(error as string);
    }
  },
});

export default workersAPI;
