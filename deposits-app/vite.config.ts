import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {dest_api, dest_img, dest_root} from './target_config'

// https://vite.dev/config/
export default defineConfig({
  // base: "/deposits_frontend",
  server: {
    host: dest_root, //0.0.0.0 for dev
    port: 5173,
    proxy: {
          "/api": {
            target: dest_api,
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, ""),
          },
          "/mininglogo": {
            target: dest_img + "/mininglogo",
            changeOrigin: true,   
            rewrite: (path) => path.replace(/^\/mininglogo/, ""),
          },
    }
    
  },
  plugins: [react()], 
})