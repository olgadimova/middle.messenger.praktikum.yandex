import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: resolve(__dirname, 'src'),
  publicDir: resolve(__dirname, 'public'),
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
      },
    },
  },
  server: {
    port: 3000,
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "/shared/styles/variables.scss";
        `,
      },
    },
  },
  resolve: {
    alias: [
      { find: 'shared', replacement: resolve(__dirname, 'src/shared') },
      { find: 'pages', replacement: resolve(__dirname, 'src/pages') },
      { find: 'api', replacement: resolve(__dirname, 'src/api') },
    ],
  },
});
