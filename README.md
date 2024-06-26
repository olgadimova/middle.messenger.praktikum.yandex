## Проект Чаты

### Описание

Приложение **Чаты** позволяет зарегистрироваться и создать список чатов с последующей отправкой сообщений, а также настроить и обновлять свой профиль.

Разработано с использованием следующих технологий: Handlebars, Node.js(Express), scss, Vite. Проект написан на TypeScript, использует ESLint, Stylelint, Prettier для проверки и форматирования кода. Также в проект добавлены юнит-тесты с использованием Mocha, Chai и настроен пре-коммит(линтер + тесты).

Приложение доступно для просмотра по ссылке - https://keen-truffle-89ab96.netlify.app

Скрины дизайна доступны для просмотра в папке /ui

Были реализованы следующие страницы:

- Логин - https://keen-truffle-89ab96.netlify.app/
- Регистрация - https://keen-truffle-89ab96.netlify.app/sign-up
- Список чатов - https://keen-truffle-89ab96.netlify.app/messenger
- Профиль - https://keen-truffle-89ab96.netlify.app/profile
- Обновить Профиль - https://keen-truffle-89ab96.netlify.app/settings
- Обновить Пароль - https://keen-truffle-89ab96.netlify.app/settings-password
- 404 Ошибка - https://keen-truffle-89ab96.netlify.app/404
- 500 Ошибка - https://keen-truffle-89ab96.netlify.app/500

### Локальное разворачивание

Для локальной работы с проектом необходимо:

1. Cклонировать репозиторий
2. Установить зависимости

```
npm install
```

3. Запустить проект

```
npm run dev
```

### Публикация в Production

Осуществляется через скрипт ниже:

```
npm run start
```
