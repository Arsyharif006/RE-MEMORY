import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/RE-MEMORY/', // WAJIB sesuai nama repo
})
