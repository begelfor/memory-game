import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import yaml from '@rollup/plugin-yaml'

export default defineConfig({
  base: '/shush/',
  plugins: [vue(), yaml()],
  build: {
    outDir: '../shush/'
  }
})

// module.exports = {
  // publicPath: '/memory-game/'
// }

// vue.config.js

// module.exports = {
//   publicPath: process.env.NODE_ENV === "production" ? "/REPO_NAME/" : "/",
// }; 