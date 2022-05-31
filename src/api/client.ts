import axios from 'axios';
import { getJwt, getUser } from 'src/utils/user';

const client = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/${process.env.REACT_APP_API_VERSION}`
});

client.interceptors.request.use((config) => {
  const user = getUser();
  if (user) {
    config.headers!.Authorization = `Bearer ${getJwt()}`;
  }
  return config;
});

export default client;
