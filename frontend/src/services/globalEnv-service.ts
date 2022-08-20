const isProd = process.env.NODE_ENV === 'production';
export const globalEnv = {
  API_ROOT: import.meta.env.VITE_API_ROOT,
  WS_ROOT: import.meta.env.VITE_WS_ROOT,
  API_VERSION: import.meta.env.VITE_API_VERSION,
};

global['globalEnv'] = isProd ? window._env_ : globalEnv;
