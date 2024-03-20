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

declare type Message = {
  content: string;
  id: number;
  time: string;
  type: string;
  user_id: number;
};
