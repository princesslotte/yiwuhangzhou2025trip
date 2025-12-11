import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // IMPORTANT: The repository name on GitHub MUST be 'yiwuhangzhou2025trip'
  base: '/yiwuhangzhou2025trip/',
});