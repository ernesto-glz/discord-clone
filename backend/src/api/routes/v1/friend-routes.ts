import { validateCreateFR } from 'api/validations/friend-validations';
import { ApiError } from 'api/errors/ApiError';
import { FriendService } from 'api/services/friend-service';
import { ApiResponses } from 'config/constants/api-responses';
import { AsyncRouter } from 'express-async-router';
import { ApiRoutes } from 'config/constants/api-routes';

const router = AsyncRouter();

router.get(ApiRoutes['FRIEND']['PENDING_REQUESTS'], async (req, res) => {
  const { user } = res.locals;
  const pendingRequests = await FriendService.getPending(user._id);
  res.status(200).send(pendingRequests);
});

router.get(ApiRoutes['FRIEND']['OUTGOING_REQUESTS'], async (req, res) => {
  const { user } = res.locals;
  const outgoingRequests = await FriendService.getOutgoing(user._id);
  res.status(200).send(outgoingRequests);
});

router.post(ApiRoutes['FRIEND']['CREATE_REQUEST'], validateCreateFR, async (req, res) => {
  const { username, discriminator } = req.body;
  const { user } = res.locals;
  const friendRequest = await FriendService.create({
    from: user._id,
    discriminator,
    username
  });
  res.status(201).send(friendRequest);
});

router.put(ApiRoutes['FRIEND']['ACCEPT_REQUEST'], async (req, res) => {
  const { user } = res.locals;
  const { requestId } = req.params;
  const result = await FriendService.accept(requestId, user._id);
  res.status(200).send(result);
});

router.get(ApiRoutes['FRIEND']['GET_FRIENDS'], async (req, res) => {
  const { user } = res.locals;
  const { extraInfo } = req.query;

  if (!extraInfo) {
    throw new ApiError(400, ApiResponses.QS_EXTRA_INFO_REQUIRED);
  }

  const result = await FriendService.getFriends(user._id, extraInfo === 'true' ? true : false);
  res.status(200).send(result);
});

router.delete(ApiRoutes['FRIEND']['DELETE_REQUEST'], async (req, res) => {
  const { user } = res.locals;
  const { requestId } = req.params;
  const result = await FriendService.remove(requestId, user._id);
  res.status(200).send(result);
});

export default router;
