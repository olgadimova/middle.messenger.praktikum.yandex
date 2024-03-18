import { HTTP } from 'shared/services';
import { BaseAPI } from 'api/services';

const chatsApiInstance = new HTTP('/chats');

export class ChatsApi extends BaseAPI {
  public request({ params }: { params?: RequestChatsParams }) {
    return chatsApiInstance.get('', { params });
  }

  public requestChatUsers({ id }: { id: number }) {
    return chatsApiInstance.get(`/${id}/users`);
  }

  public create(data: Record<string, string>) {
    return chatsApiInstance.post('', { data });
  }

  public delete(data: Record<string, number>) {
    return chatsApiInstance.delete('', { data });
  }

  public addChatUsers(data: UpdateChatUsersParams) {
    return chatsApiInstance.put('/users', { data });
  }

  public deleteChatUsers(data: UpdateChatUsersParams) {
    return chatsApiInstance.delete('/users', { data });
  }

  public getChatToken({ chatId }: { chatId: number }) {
    return chatsApiInstance.post(`/token/${chatId}`);
  }
}
