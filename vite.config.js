import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: '/memory-game/',
  plugins: [vue()]
})

// module.exports = {
  // publicPath: '/memory-game/'
// }

// vue.config.js

// module.exports = {
//   publicPath: process.env.NODE_ENV === "production" ? "/REPO_NAME/" : "/",
// }; 