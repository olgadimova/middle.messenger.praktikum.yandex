import { ChatsApi } from 'api/services';

const chatsApi = new ChatsApi();

export class ChatsController {
  public async getAllChats({ offset, limit }: RequestChatsParams) {
    try {
      const data: ChatObject[] = await chatsApi.request({ params: { offset, limit } });
      console.log('chats', data);
    } catch (err) {
      throw new Error('Не удалось загрузить чаты. Попробуйте снова.');
    }
  }

  public async createChat({ title }: { title: string }) {
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
}
