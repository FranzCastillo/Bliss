import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { configDefaults } from 'vitest/dist/config'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: './setupTest.js',
    exclude:[...configDefaults.exclude, "**/src/__tests__/*"],
    coverage: {
      provider: 'istanbul'
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
  }
})
