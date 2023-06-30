import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path = require('path')

export default defineConfig({
  plugins: [vue()],
  base:"/todolist-project-vue/",
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
})
