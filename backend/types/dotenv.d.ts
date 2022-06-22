declare global {
  namespace NodeJS {
    export interface ProcessEnv {
      PORT: string;
      MONGO_URI: string;
      NODE_ENV: 'dev' | 'prod';
    }
  }
}
export {};
