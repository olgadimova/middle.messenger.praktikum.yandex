import { MessagesApi } from 'api/services';

const messagesApi = new MessagesApi();

export class MessagesController {
  public async loadChat({ chatId, token, userId }: ConnectChatParams): Promise<void> {
    const params: ConnectChatParams = {
      chatId,
      token,
      userId,
    };

    try {
      await messagesApi.request({ params });
    } catch (err) {
      throw new Error('Не удалось загрузить чат.');
    }
  }

  public async sendMessage(params: SendMessageParams): Promise<void> {
    const data: SendMessageData = {
      type: 'message',
      content: params.message,
    };

    try {
      await messagesApi.send(data);
    } catch (err) {
      throw new Error('Не удалось отправить сообщение.');
    }
  }
}
