import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// 按需自动导入elementui
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// 引入vite-plugin-html插件：可以在index.html中使用环境变量
import { createHtmlPlugin } from 'vite-plugin-html'

//这个配置 为了在html中使用 环境变量
const getViteEnv = (mode: any, target: any) => {
  return loadEnv(mode, process.cwd())[target];
};

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => { 
  // command 开发环境为serve 生产环境为build
  // 根据当前工作目录中的 `mode` 加载 .env 文件
  return {
    plugins: [
      vue(),
      vueJsx(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver({
          importStyle: 'sass',
        })],
      }),
      createHtmlPlugin({
        inject: {
          data: {
            //将环境变量 VITE_APP_TITLE 赋值给 title 方便 html页面使用 title 获取系统标题
            title: getViteEnv(mode, "VITE_APP_TITLE"),
          }
        }
      })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/assets/element.scss" as *;`,
        },
      }
    }
  }
})
