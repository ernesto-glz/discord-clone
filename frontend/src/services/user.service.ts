import { loadAbort } from 'src/utils/load-abort-axios';
import { getUserInfo } from 'src/api/user';

export class UserService {
  static getUserInfo(userId: string) {
    const controller = loadAbort();
    return {
      call: getUserInfo(userId, controller),
      controller
    };
  }
}
