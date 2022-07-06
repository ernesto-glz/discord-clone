import {
  acceptFriendRequest,
  createFriendRequest,
  deleteFriendRequest
} from 'src/api/friend';
import { CreateFriendRequest } from 'src/models/friend.model';
import { loadAbort } from 'src/utils/load-abort-axios';

export class FriendService {
  static createRequest(data: CreateFriendRequest) {
    const controller = loadAbort();
    return {
      call: createFriendRequest(data, controller),
      controller
    };
  }

  static deleteFriendRequest(requestId: string) {
    const controller = loadAbort();
    return {
      call: deleteFriendRequest(requestId, controller),
      controller
    };
  }

  static acceptFriendRequest(requestId: string) {
    const controller = loadAbort();
    return {
      call: acceptFriendRequest(requestId, controller),
      controller
    };
  }
}
