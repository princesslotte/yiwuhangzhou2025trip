import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
        manifest: {
          name: 'Yiwu & Hangzhou Planner',
          short_name: 'YiHang Trip',
          description: 'A smart, bilingual travel itinerary planner for Yiwu and Hangzhou.',
          theme_color: '#f8e8c1',
          background_color: '#f8e8c1',
          display: 'standalone',
          start_url: './',
          icons: [
            {
              src: 'https://cdn-icons-png.flaticon.com/512/201/201623.png',
              sizes: '192x192',
              type: 'image/png'
            },
            {
              src: 'https://cdn-icons-png.flaticon.com/512/201/201623.png',
              sizes: '512x512',
              type: 'image/png'
            }
          ]
        }
      })
    ],
    // IMPORTANT: This repository name must match your GitHub repository name exactly
    base: '/yiwuhangzhou2025trip/',
    // This allows the code to use `process.env.API_KEY` in the browser
    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY || env.VITE_GEMINI_API_KEY || '')
    },
    envPrefix: ['VITE_', 'GEMINI_'],
  };
});