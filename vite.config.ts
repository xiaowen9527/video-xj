import Uni from '@dcloudio/vite-plugin-uni'
import UniHelperComponents from '@uni-helper/vite-plugin-uni-components'
import UniHelperLayouts from '@uni-helper/vite-plugin-uni-layouts'
import UniHelperManifest from '@uni-helper/vite-plugin-uni-manifest'
import UniHelperPages from '@uni-helper/vite-plugin-uni-pages'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vite'
import UniPolyfill from 'vite-plugin-uni-polyfill'


// https://vitejs.dev/config/
export default async () => {
    const UnoCSS = (await import('unocss/vite')).default

    return defineConfig({
        plugins: [
            // https://github.com/uni-helper/vite-plugin-uni-manifest
            UniHelperManifest(),
            // https://github.com/uni-helper/vite-plugin-uni-pages
            UniHelperPages({
                dts: 'src/uni-pages.d.ts',
            }),
            // https://github.com/uni-helper/vite-plugin-uni-layouts
            UniHelperLayouts(),
            // https://github.com/uni-helper/vite-plugin-uni-components
            UniHelperComponents({
                dts: 'src/components.d.ts',
                directoryAsNamespace: true,
            }),
            Uni(),
            UniPolyfill(),
            // https://github.com/antfu/unplugin-auto-import
            AutoImport({
                imports: ['vue', '@vueuse/core', 'uni-app'],
                dts: 'src/auto-imports.d.ts',
                dirs: ['src/composables', 'src/stores', 'src/utils'],
                vueTemplate: true,
            }),
            // https://github.com/antfu/unocss
            // see unocss.config.ts for config
            UnoCSS(),
        ],
        server: {
            port: 5173, // 服务端口号
            open: false, // 服务启动时是否自动打开浏览器
            cors: true, // 允许跨域
            proxy: {
                '/api': {
                    target: 'http://121.89.244.79/exam-system/api',//对面接口
                    changeOrigin: true,
                    rewrite: (path) => path.replace('/api', '')
                }
                // '/api': {
                //     target: 'https://ymapp.cdcp.org.cn/nipisgd/',//对面接口
                //     changeOrigin: true,
                //     rewrite: (path) => path.replace('/api', '')
                // }
            }
        }
    })
}
