import { defineConfig } from 'vite'
import handlebars from 'vite-plugin-handlebars'
import { resolve } from 'path'

export default defineConfig({
  root: resolve(__dirname, 'src'),
  server: {
    port: 3000,
  },
  plugins: [
    handlebars({
      context: {
        selectedChatId: 1,
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
          @import "/styles/style.css";
          @import "/styles/variables.scss";
        `,
      },
    },
  },
})
