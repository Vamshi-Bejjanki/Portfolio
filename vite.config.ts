import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Relative base so the built site works on GitHub Pages (/Portfolio/) and locally.
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
});
