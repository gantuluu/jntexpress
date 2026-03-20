import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Membuka akses ke semua network interface
    port: 3000,
    strictPort: true,
    // Baris di bawah ini krusial untuk memperbaiki "refuse to connect" di v0/Vercel
    allowedHosts: true,
    hmr: {
      clientPort: 443 // Memaksa HMR menggunakan port HTTPS standar Vercel
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})