import { ChatsApi } from 'api/services';
import { store } from 'shared/services';

const chatsApi = new ChatsApi();

export class ChatsController {
  public async getAllChats(params?: RequestChatsParams) {
    const offset = params?.offset ?? 0;
    const limit = params?.limit ?? 10;

    try {
      const data: ChatObject[] = await chatsApi.request({ params: { offset, limit } });
      store.set('chats', data);
    } catch (err) {
      throw new Error('Не удалось загрузить чаты. Попробуйте снова.');
    }
  }

  public async createChat({ title }: CreateChatParams) {
    const data = {
      title,
    };

    try {
      await chatsApi.create(data);
    } catch (err) {
      throw new Error('Не удалось создать чат. Попробуйте снова.');
    }
  }

  public async deleteChat({ id }: { id: number }) {
    const data = {
      chatId: id,
    };

    try {
      await chatsApi.delete(data);
    } catch (err) {
      throw new Error('Не удалось удалить чат. Попробуйте снова.');
    }
  }

  public async addChatUsers({ users, chatId }: UpdateChatUsersParams) {
    const data: UpdateChatUsersParams = {
      users,
      chatId,
    };

    try {
      await chatsApi.addChatUsers(data);
    } catch (err) {
      throw new Error('Не удалось добавить пользователей. Попробуйте снова.');
    }
  }

  public async deleteChatUsers({ users, chatId }: UpdateChatUsersParams) {
    const data: UpdateChatUsersParams = {
      users,
      chatId,
    };

    try {
      await chatsApi.deleteChatUsers(data);
    } catch (err) {
      throw new Error('Не удалось удалить пользователей. Попробуйте снова.');
    }
  }

  public async getChatUsers({ id }: { id: number }) {
    const data = {
      id,
    };

    try {
      const users: UserObject[] = await chatsApi.requestChatUsers(data);
      store.set('chatUsers', users);
      return users.length;
    } catch (err) {
      throw new Error('Не удалось загрузить чаты. Попробуйте снова.');
    }
  }
}
