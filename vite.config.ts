import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['react-paginate'],
  },
  build: {
    commonjsOptions: {
      include: [/react-paginate/, /node_modules/],
    },
  },
})