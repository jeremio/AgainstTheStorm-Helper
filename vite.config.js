import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// Le nom de votre dépôt GitHub, par exemple "AgainstTheStorm-Helper"
const GITHUB_REPO_NAME = 'AgainstTheStorm-Helper'

// https://vitejs.dev/config/
export default defineConfig({
  // La base doit être le nom de votre dépôt pour que GitHub Pages fonctionne
  base: process.env.NODE_ENV === 'production' ? `/${GITHUB_REPO_NAME}/` : '/',
  plugins: [vue({
    vapor: true,
  })],
})
