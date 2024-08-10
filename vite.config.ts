/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';
import { ValidateEnv } from '@julr/vite-plugin-validate-env';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [ValidateEnv(), svgr(), react(), tsconfigPaths()],
  define: {
    global: 'window',
  },
  resolve: {
    alias: {
      '@assets': '/src/assets',
      '@components': '/src/components',
      '@features': '/src/features',
      '@': '/src',
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
  },
  server: {
    host: '127.0.0.1',
  },
  mode: 'dev',
});
