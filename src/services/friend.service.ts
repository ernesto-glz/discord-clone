import {
  acceptFriendRequest,
  createFriendRequest,
  deleteFriendRequest,
  getFriends,
  getOutgoingRequests,
  getPendingRequests
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

  static getPendingRequests() {
    const controller = loadAbort();
    return {
      call: getPendingRequests(controller),
      controller
    };
  }

  static getOutgoingRequests() {
    const controller = loadAbort();
    return {
      call: getOutgoingRequests(controller),
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

  static getFriends() {
    const controller = loadAbort();
    return {
      call: getFriends(controller),
      controller
    };
  }
}
