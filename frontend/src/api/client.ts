import axios from 'axios';
import { getJwt } from 'src/utils/user';

const client = axios.create({
  baseURL: `${process.env.REACT_APP_API_ROOT}/v${process.env.REACT_APP_API_VERSION}`
});

client.interceptors.request.use((config) => {
  config.headers!.Authorization = `Bearer ${getJwt()}`;
  return config;
});

export default client;
