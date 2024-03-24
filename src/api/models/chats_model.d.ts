declare type RequestChatsParams = {
  offset: number;
  limit: number;
  title?: string;
};

declare type CreateChatParams = { title: string };

declare type UpdateChatUsersParams = {
  users: number[];
  chatId: number;
};

declare type ChatObject = {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  created_by: number;
  last_message: {
    user: UserObject;
    time: string;
    content: string;
  };
};
