import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/tonne-leicester/',
  plugins: [react()],
  build: {
    target: 'es2020',
    cssCodeSplit: false,
  },
});
