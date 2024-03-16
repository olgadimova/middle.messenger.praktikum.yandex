import { HTTP } from 'shared/services';
import { BaseAPI } from 'api/services';

const chatsApiInstance = new HTTP('/chats');

export class ChatsApi extends BaseAPI {
  public request({ params }: { params?: RequestChatsParams }) {
    return chatsApiInstance.get('', { params });
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
    return chatsApiInstance.put('/users', { data });
  }
}
