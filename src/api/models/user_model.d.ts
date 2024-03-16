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

declare type UserObject = {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  phone: string;
  login: string;
  avatar: string;
  email: string;
};
