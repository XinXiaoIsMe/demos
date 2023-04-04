import VueMacros from 'unplugin-vue-macros/vite'
import Vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    VueMacros({
      plugins: {
        vue: Vue()
      },
    }),
  ],
})
