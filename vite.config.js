import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';
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
  plugins: [
    handlebars({
      partialDirectory: resolve(__dirname, 'src/shared/components'),
      context: {
        selectedChatId: 1,
        user: {
          id: 1,
          email: 'pochta@smth.com',
          login: 'ivanchik',
          display_name: 'Ваня',
          first_name: 'Иван',
          second_name: 'Иванов',
          phone: '+79991234567',
        },
        chats: [
          {
            id: 1,
            title: 'Андрей',
            avatar: '',
            unreadMessages: 2,
            lastMessage: {
              title: 'Привет',
              createdAt: '10:30',
            },
            messages: [
              {
                isMine: true,
                title: 'Привет',
                createdAt: '10:30',
              },
              {
                isMine: false,
                title: 'И тебе',
                createdAt: '10:30',
              },
            ],
          },
          {
            id: 2,
            title: 'Киноклуб',
            avatar: '',
            unreadMessages: 0,
            lastMessage: {
              title: 'Вы: до завтра!',
              createdAt: 'Пн',
            },
            messages: [
              {
                isMine: true,
                title: 'до завтра!',
                createdAt: 'Пн',
              },
            ],
          },
          {
            id: 3,
            title: 'Hi',
            avatar: '',
            unreadMessages: 4,
            lastMessage: {
              title: 'Как дела?',
              createdAt: 'Пн',
            },
            messages: [
              {
                isMine: false,
                title: 'Как дела?',
                createdAt: 'Пн',
              },
            ],
          },
          {
            id: 4,
            title: 'Рандом',
            avatar: '',
            unreadMessages: 0,
            lastMessage: {
              title: 'тестовое сообщение',
              createdAt: '10 мая 2020',
            },
            messages: [
              {
                isMine: true,
                title: 'тестовое сообщение',
                createdAt: '10 мая 2020',
              },
            ],
          },
        ],
      },
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "/shared/styles/variables.scss";
          @import "/shared/styles/base.scss";
          @import "/shared/components/index.scss";
        `,
      },
    },
  },
  resolve: {
    alias: [{ find: 'shared', replacement: resolve(__dirname, 'src/shared') }],
  },
});
