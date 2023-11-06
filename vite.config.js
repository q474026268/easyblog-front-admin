// 引入 Vite 的配置函数和 Vue 插件
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path"

// 导出 Vite 配置对象
// 官方文档：https://vitejs.dev/config/
export default defineConfig({
  // Vite 插件数组
  plugins: [vue()], // 使用 Vue 3 插件

  // 开发服务器配置
  server: {
    hmr: true, // 启用模块热替换（Hot Module Replacement）
    port: 3001, // 设定开发服务器监听的端口号为 3001

    // 代理配置
    proxy: {
      // 当请求 URL 路径以 /api 开头时，代理该请求
      '/api': {
        target: 'http://localhost:8081/', // 目标 API 的地址和端口号
        secure: false, // 对 https 请求的接口禁用 ssl 验证
        changeOrigin: true, // 用于控制请求头中的 Host 值
        rewrite: (path) => path.replace(/^\/api/, '/api') // 重写请求 URL 的路径
      }
    },
  },
  resolve: {
    // 配置路径别名
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})