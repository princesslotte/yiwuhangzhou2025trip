import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Ensure this matches your repo name
  base: '/yiwuhangzhou2025trip/',
});