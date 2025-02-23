import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// module.exports = {
  // publicPath: '/memory-game/'
// }
export default defineConfig({
  base: '/memory-game/',
  plugins: [vue()]
}) 