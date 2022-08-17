import { rmSync } from 'fs';
import { join } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import pkg from './package.json';

rmSync(join(__dirname, 'dist'), { recursive: true, force: true }); // v14.14.0

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    global: 'window',
  },
  publicDir: join(__dirname, 'res'),
  resolve: {
    alias: {
      assets: join(__dirname, 'res'),
      src: join(__dirname, 'src'),
    },
  },
  plugins: [react()],
  server: {
    host: pkg.env.VITE_DEV_SERVER_HOST,
    port: pkg.env.VITE_DEV_SERVER_PORT,
  },
});
