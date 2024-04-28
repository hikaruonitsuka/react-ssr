import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/react-ssr/',
  server: {
    port: 3000,
  },
  plugins: [tsconfigPaths(), react()],
});
