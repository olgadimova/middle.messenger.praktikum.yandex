import { Router } from 'shared/services';
import { AuthApi } from 'api/services';

const authApi = new AuthApi();

export class AuthController {
  public async login(params: LoginParams): Promise<void> {
    const data: LoginParams = {
      login: params.login,
      password: params.password,
    };

    try {
      await authApi.login(data);

      const router = Router.getInstance();
      router.go('/messenger');
    } catch (err) {
      throw new Error('Неверный логин или пароль');
    }
  }

  public async register({ first_name, second_name, login, email, password, phone }: RegisterParams): Promise<void> {
    const registerData: RegisterParams = {
      first_name,
      second_name,
      login,
      email,
      password,
      phone,
    };

    const loginData: LoginParams = {
      login,
      password,
    };

    try {
      await authApi.create(registerData);
      await authApi.login(loginData);

      const router = Router.getInstance();
      router.go('/messenger');
    } catch (err) {
      throw new Error('Ошибка Регистрации. Попробуйте позже.');
    }
  }

  public async getUser() {
    try {
      await authApi.request();
    } catch (err) {
      throw new Error('Не удалось загрузить данные. Попробуйте снова.');
    }
  }

  public async logout() {
    try {
      await authApi.logout();
    } catch (err) {
      throw new Error('Не удалось выйти. Попробуйте снова.');
    }
  }
}
