import axios from "axios";
import { token } from "src/utils/utils";

const API_ROOT = import.meta.env.VITE_API_ROOT;
const API_VERSION = import.meta.env.VITE_API_VERSION;

const client = axios.create({
  baseURL: `${API_ROOT}/v${API_VERSION}`,
});

client.interceptors.request.use((config) => {
  config.headers!.Authorization = `Bearer ${token()}`;
  return config;
});

export default client;
