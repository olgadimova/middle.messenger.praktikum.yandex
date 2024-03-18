declare type ConnectChatParams = {
  chatId: number;
  token: string;
  userId: number;
};

declare type SendMessageParams = {
  message: string;
};

declare type SendMessageData = {
  type: string;
  content: string;
};
