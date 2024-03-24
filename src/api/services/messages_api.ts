import { WSTransport } from 'shared/services';
import { BaseAPI } from 'api/services';

const messagesApiInstance = new WSTransport('/chats');

export class MessagesApi extends BaseAPI {
  public request({ params: { chatId, token, userId } }: { params: ConnectChatParams }) {
    return messagesApiInstance.connect(`/${userId}/${chatId}/${token}`);
  }

  public send(data: SendMessageData) {
    return messagesApiInstance.send(data);
  }
}
