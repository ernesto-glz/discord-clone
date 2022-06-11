import axios from 'axios';
import { logOut } from 'src/redux/states/user';
import store from 'src/redux/store';
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

client.interceptors.response.use(
  (response) => response,
  async (err) => {
    if (err.message !== 'canceled' && err.response.status === 401) {
      store.dispatch(logOut());
    }
    return Promise.reject(err);
  }
);

export default client;
