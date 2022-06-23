import { ApiResponses } from 'config/constants/api-responses';
import { ApiError } from 'api/errors/ApiError';
import { Request, Response } from 'express';
import { FriendService } from 'api/services/friend.service';

export class FriendController {
  static async createFriendRequest(req: Request, res: Response) {
    const { toUsername, toShortId } = req.body;
    const { user } = res.locals;
    const friendRequest = await FriendService.createFriendRequest({
      from: user._id,
      toUsername,
      toShortId
    });
    res.status(201).send(friendRequest);
  }

  static async getPendingRequests(req: Request, res: Response) {
    const { user } = res.locals;
    const pendingRequests = await FriendService.getPendingRequests(user._id);
    res.status(200).send(pendingRequests);
  }

  static async getOutgoingRequests(req: Request, res: Response) {
    const { user } = res.locals;
    const outgoingRequests = await FriendService.getOutgoingRequests(user._id);
    res.status(200).send(outgoingRequests);
  }

  static async deleteFriendRequest(req: Request, res: Response) {
    const { user } = res.locals;
    const { requestId } = req.params;
    const result = await FriendService.deleteFriendRequest(requestId, user._id);
    res.status(200).send(result);
  }

  static async acceptFriendRequest(req: Request, res: Response) {
    const { user } = res.locals;
    const { requestId } = req.params;
    const result = await FriendService.acceptFriendRequest(requestId, user._id);
    res.status(200).send(result);
  }

  static async getFriends(req: Request, res: Response) {
    const { user } = res.locals;
    const { extraInfo } = req.query;

    if (!extraInfo) {
      throw new ApiError(400, ApiResponses.QS_EXTRA_INFO_REQUIRED);
    }

    const result = await FriendService.getFriends(user._id, extraInfo === 'true' ? true : false);
    res.status(200).send(result);
  }
}
