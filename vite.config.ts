import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

const monacoWorkerPrefix = `monaco-editor/esm/vs`
const pathSrc = path.resolve(__dirname, 'src')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '',
  server: {
    port: 7777 // 你需要定义的端口号
  },
  resolve: {
    // 目录别名
    alias: {
      '@': pathSrc
    }
  },
  build: {
    outDir: 'dist',
    // 进行压缩计算
    // brotliSize: false,
    rollupOptions: {
      output: {
        manualChunks: {
          jsonWorker: [`${monacoWorkerPrefix}/language/json/json.worker`],
          cssWorker: [`${monacoWorkerPrefix}/language/css/css.worker`],
          htmlWorker: [`${monacoWorkerPrefix}/language/html/html.worker`],
          tsWorker: [`${monacoWorkerPrefix}/language/typescript/ts.worker`],
          editorWorker: [`${monacoWorkerPrefix}/editor/editor.worker`]
        }
      }
    }
  }
})
// import { defineConfig } from 'vite'
// import vue from '@vitejs/plugin-vue'
// export default defineConfig({
//   plugins: [vue()],
//   // 公共样式
//   css: {
//     // 🔥此处添加全局scss🔥
//     preprocessorOptions: {
//       scss: {
//         additionalData: '@import "./src/assets/common.scss";'
//       }
//     }
//   },
//   // 服务
//   server: {
//     open: false,
//     port: 8080,
//     // 代理配置
//     proxy: {
//       '/api': 'http://192.168.20.88:8888',
//     }
//   },
//   build: {
//     // 打包后目录,默认dist
//     outDir: 'dist',
//   },
//   // 引入第三方的配置
//   optimizeDeps: {
//     include: []
//   },
//   // 生产环境路径，类似webpack的assetsPath
//   base: './',
// })


