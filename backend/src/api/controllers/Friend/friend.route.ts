import { FriendController } from 'api/controllers/Friend/friend.controller';
import { validateCreateFR } from 'api/controllers/Friend/validations/friend.validation';
import { AsyncRouter } from 'express-async-router';
import { ApiRoutes } from '../../../config/constants/api-routes';

const router = AsyncRouter();

router.get(ApiRoutes['FRIEND']['PENDING_REQUESTS'], FriendController.getPendingRequests);
router.get(ApiRoutes['FRIEND']['OUTGOING_REQUESTS'], FriendController.getOutgoingRequests);
router.post(ApiRoutes['FRIEND']['CREATE_REQUEST'], validateCreateFR, FriendController.createRequest);
router.put(ApiRoutes['FRIEND']['ACCEPT_REQUEST'], FriendController.acceptFriendRequest);
router.get(ApiRoutes['FRIEND']['GET_FRIENDS'], FriendController.getFriends);
router.delete(ApiRoutes['FRIEND']['DELETE_REQUEST'], FriendController.deleteFriendRequest);

export default router;
