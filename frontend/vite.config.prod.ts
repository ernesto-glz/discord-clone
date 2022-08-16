import { rmSync } from 'fs';
import { join } from 'path';
import { defineConfig, UserConfig, Plugin } from 'vite';
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

function withDebug(config: UserConfig): UserConfig {
  if (process.env.VSCODE_DEBUG) {
    config.build.sourcemap = true;
    config.plugins = (config.plugins || []).concat({
      name: 'electron-vite-debug',
      configResolved(config) {
        const index = config.plugins.findIndex(
          (p) => p.name === 'electron-main-watcher'
        );
        // At present, Vite can only modify plugins in configResolved hook.
        (config.plugins as Plugin[]).splice(index, 1);
      },
    });
  }
  return config;
}
