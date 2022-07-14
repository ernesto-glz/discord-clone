import axios from 'axios';
import { token } from 'src/utils/utils';

const client = axios.create({
  baseURL: `${process.env.REACT_APP_API_ROOT}/v${process.env.REACT_APP_API_VERSION}`
});

client.interceptors.request.use((config) => {
  config.headers!.Authorization = `Bearer ${token()}`;
  return config;
});

export default client;
