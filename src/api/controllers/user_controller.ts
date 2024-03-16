import { UserApi } from 'api/services';

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
      console.log('updated', updatedUser);
    } catch (err) {
      throw new Error('Не удалось обновить профиль. Попробуйте позже.');
    }
  }

  public async updateAvatar({ avatar }: { avatar: File }): Promise<void> {
    const formData = new FormData();
    formData.append('avatar', avatar);

    try {
      const updatedUser: UserObject = await userApi.updateAvatar(formData);
      console.log('updated', updatedUser);
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
}
