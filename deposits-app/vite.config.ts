import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: true, // изначально добавил для доступа по локальной сети
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:8000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      // "/miningServices":{
      //   target: "http://localhost:8000",
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\/miningServices/, "/miningServices/  "),
      // }
    }
  },
  plugins: [react()],
})