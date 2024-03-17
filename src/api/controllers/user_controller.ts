import { UserApi } from 'api/services';
import { store } from 'shared/services';

const userApi = new UserApi();

export class UserController {
  public async updateProfile({
    first_name,
    second_name,
    display_name,
    email,
    phone,
    login,
  }: UserProfileParams): Promise<void> {
    const data: UserProfileParams = {
      first_name,
      second_name,
      display_name,
      email,
      phone,
      login,
    };

    try {
      const updatedUser: UserObject = await userApi.update(data);
      store.set('user', updatedUser);
    } catch (err) {
      throw new Error('Не удалось обновить профиль. Попробуйте позже.');
    }
  }

  public async updateAvatar({ avatar }: { avatar: File }): Promise<void> {
    const formData = new FormData();
    formData.append('avatar', avatar);

    try {
      const updatedUser: UserObject = await userApi.updateAvatar(formData);
      store.set('user', updatedUser);
    } catch (err) {
      throw new Error('Не удалось обновить аватар. Попробуйте позже.');
    }
  }

  public async updatePassword({ oldPassword, newPassword }: UserPasswordParams): Promise<void> {
    const data: UserPasswordParams = {
      oldPassword,
      newPassword,
    };

    try {
      await userApi.updatePassword(data);
    } catch (err) {
      throw new Error('Не удалось обновить пароль. Проверьте правильность ввода или попробуйте позже.');
    }
  }

  public async searchUserById({ login }: SearchUserParams): Promise<number | null> {
    const data = {
      login,
    };

    try {
      const users: UserObject[] = await userApi.searchUserById(data);
      return users[0] ? users[0].id : null;
    } catch (err) {
      throw new Error('Не удалось обновить пароль. Проверьте правильность ввода или попробуйте позже.');
    }
  }
}
