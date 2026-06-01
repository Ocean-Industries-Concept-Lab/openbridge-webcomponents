import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true, // Listen on all addresses (0.0.0.0) for dev containers
    port: 5173,
    strictPort: false,
  },
  preview: {
    host: true, // Listen on all addresses (0.0.0.0) for dev containers
    port: 4173,
    strictPort: false,
  },
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        maximumFileSizeToCacheInBytes: 7_000_000
      },
      manifest: {
        name: 'OpenBridge Demo',
        short_name: 'OpenBridge',
        description: 'Demo of OpenBridge WebComponent',
        theme_color: '#fcfcfc',
        display: 'fullscreen',
        icons: [
          {
            src: "/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any"
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any"
          },
          {
            src: "/pwa-maskable-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable"
          },
          {
            src: "/pwa-maskable-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable"
          }
        ],
      }
    }),
    vue({
      script: {
        defineModel: true
      },
      template: {
        compilerOptions: {
          // treat all tags with a dash as custom elements
          isCustomElement: (tag) => tag.includes('obc-') || tag.includes('obi-')
        }
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})

