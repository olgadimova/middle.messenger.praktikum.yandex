import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: resolve(__dirname, 'src'),
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        register: resolve(__dirname, 'src/register.html'),
        profile: resolve(__dirname, 'src/profile.html'),
        profileUpdate: resolve(__dirname, 'src/profile-update.html'),
        passwordUpdate: resolve(__dirname, 'src/password-update.html'),
        chat: resolve(__dirname, 'src/chat.html'),
        404: resolve(__dirname, 'src/404.html'),
        500: resolve(__dirname, 'src/500.html'),
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
    alias: [{ find: 'shared', replacement: resolve(__dirname, 'src/shared') }],
  },
});
