import { defineConfig } from 'vite'
import vue2 from '@vitejs/plugin-vue2'

export default defineConfig({
  plugins: [vue2()],
  // 相对路径基准，dist 可部署到任意子路径
  base: './',
  server: {
    host: true,
    port: 5173,
    // 允许任意 Host 访问（配合内网穿透/隧道预览使用；仅本地开发生效）
    allowedHosts: true
  },
  preview: {
    allowedHosts: true
  }
})
