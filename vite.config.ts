import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
    base: '/',
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  // 빌드 옵션 추가
  build: {
    rollupOptions: {
      external: [], // 빈 배열로 설정하여 모든 모듈을 번들에 포함
    },
    // public 폴더의 파일들이 올바르게 복사되도록 설정
    assetsDir: 'assets',
  },
  // public 폴더 설정 명시
  publicDir: 'public',
})
