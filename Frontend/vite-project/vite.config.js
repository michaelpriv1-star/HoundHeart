import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true,
  },
  build: {
    copyPublicDir: !isSsrBuild,
  },
}))
