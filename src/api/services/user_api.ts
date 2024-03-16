import { HTTP } from 'shared/services';
import { BaseAPI } from 'api/services';

const userApiInstance = new HTTP('/user');

export class UserApi extends BaseAPI {
  public update(data: Record<string, string | number>) {
    return userApiInstance.put('/profile', { data });
  }

  public updateAvatar(data: FormData) {
    return userApiInstance.put('/profile/avatar', { data });
  }

  public updatePassword(data: Record<string, string | number>) {
    return userApiInstance.put('/password', { data });
  }
}
