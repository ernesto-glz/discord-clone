import axios, { AxiosInstance } from 'axios';
import { token } from 'src/utils/utils';

export interface RestCall {
  data?: object;
  method?: 'get' | 'post' | 'put' | 'patch' | 'delete';
  url: string;
  headers?: object;
  errorEvent?: string;
  callback?: (payload: any) => any | Promise<any>;
}
export type UploadFileArgs = { hash: string; url: string };

export class RestClient {
  public client: AxiosInstance;

  constructor() {
    this.client = axios.create({ 
      baseURL: `${globalEnv.API_ROOT}/v${globalEnv.API_VERSION}` 
    });
    this.client.interceptors.request.use((config) => {
      config.headers!.Authorization = `Bearer ${token()}`;
      return config;
    });
  }

  public async call({ data, method, url, callback, headers, errorEvent }: RestCall) {
    try {
      const { data: payload } = await this.client.request({
        data,
        method,
        url,
        headers: { ...headers },
      });

      if (callback) callback(payload);
    } catch (error: any) {
      const response = error.response;
      if (!response?.data) return;
      const errors = response.data?.errors;
      if (errorEvent) {
        if (errorEvent === 'REQUEST_CREATE_FAILED')
          return events.emit(errorEvent, errors[0]?.message ?? response.data);
        events.emit(errorEvent, errors ?? [{ message: response.data }]);
      }
    }
  }

  public async uploadFile(file: File, callback?: (args: UploadFileArgs) => any) {
    const formData = new FormData();
    formData.append('file', file);
    await this.call({
      method: 'post',
      url: '/upload',
      data: formData,
      callback,
    });
  }
}

global['restClient'] = new RestClient();
