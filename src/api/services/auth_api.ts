import { HTTP } from 'shared/services';
import { BaseAPI } from 'api/services';

const authApiInstance = new HTTP('/auth');

export class AuthApi extends BaseAPI {
  public create(data: Record<string, string | number>) {
    return authApiInstance.post('/signup', { data, withCredentials: false });
  }

  public request() {
    return authApiInstance.get('/user');
  }

  public login(data?: Record<string, string | number>) {
    return authApiInstance.post('/signin', { data });
  }

  public logout() {
    return authApiInstance.post('/logout');
  }
}
