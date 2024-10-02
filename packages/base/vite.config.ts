import * as path from 'node:path'
import fs from 'node:fs'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isDev = mode !== 'production'

  return {
    plugins: [
      react(),
      dts({
        rollupTypes: true,
        afterBuild: (emittedFiles) => {
          emittedFiles.forEach((content, filePath) => {
            if (filePath.endsWith('.d.ts')) {
              const newFilePath = filePath.replace('.d.ts', '.d.cts')
              fs.writeFileSync(newFilePath, content)
            }
          })
        },
      }),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          charset: false,
        },
      },
    },
    build: {
      cssMinify: 'esbuild',
      minify: 'esbuild',
      outDir: 'lib',
      sourcemap: isDev,
      lib: {
        entry: path.resolve(__dirname, '/index.tsx'),
        formats: ['es', 'cjs'],
      },
      rollupOptions: {
        // output: {
        //   manualChunks(id) {
        //     if (id.includes('components')) {
        //       return 'components'
        //     }

        //     if (id.includes('node_modules')) {
        //       return 'vendor'
        //     }
        //   },
        // },
        external: ['react', 'react-dom', 'react/jsx-runtime'],
      },
    },
  }
})
