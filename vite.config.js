import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import yaml from '@rollup/plugin-yaml'

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/shush/' : '/',
  plugins: [vue(), yaml()],
  build: {
    outDir: '../shush/',
    target: 'es2022'
  }
})

// module.exports = {
  // publicPath: '/memory-game/'
// }

// vue.config.js

// module.exports = {
//   publicPath: process.env.NODE_ENV === "production" ? "/REPO_NAME/" : "/",
// }; 