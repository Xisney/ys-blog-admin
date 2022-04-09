import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgrPlugin from 'vite-plugin-svgr'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgrPlugin()],
  base: '/admin/',
  css: {
    modules: {
      generateScopedName: '[local]_[hash:4]',
    },
  },
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, './src'),
    },
  },
})
