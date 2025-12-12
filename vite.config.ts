import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
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
  // Ensure this matches your repo name
  base: '/yiwuhangzhou2025trip/',
  // Allow GEMINI_API_KEY to be exposed to client
  envPrefix: ['VITE_', 'GEMINI_'],
});