import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Set base to your GitHub repo name for GitHub Pages deployment
// e.g. if your repo is github.com/username/focusflow → base: '/focusflow/'
export default defineConfig({
  plugins: [react()],
  base: '/focusflow/', // ← change to your repo name
})