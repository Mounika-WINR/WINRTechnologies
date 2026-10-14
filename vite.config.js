import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const { API_PORT = '3002' } = loadEnv(mode, '.', '')

  return {
    plugins: [react()],
    server: {
      proxy: {
        "/api": `http://localhost:${API_PORT}`,
      },
    },
  }
})
