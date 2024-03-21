declare type UserProfileParams = {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
};

declare type UserPasswordParams = {
  oldPassword: string;
  newPassword: string;
};

declare type SearchUserParams = {
  login: string;
};

declare type UserObject = {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string | null;
  phone: string;
  login: string;
  avatar: string | null;
  email: string;
};
