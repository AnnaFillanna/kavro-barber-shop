import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/kavro-barber-shop/' : '/',
  plugins: [react()],
  server: {
    port: 5174,
    strictPort: true,
  },
}))
