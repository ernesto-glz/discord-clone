import { FriendController } from 'controllers/Friend/friend.controller';
import { validateCreateFR } from 'controllers/Friend/validations/friend.validation';
import { AsyncRouter } from 'express-async-router';
import { FriendRoutes } from '../../config/constants/api-routes';

const router = AsyncRouter();

router.get(FriendRoutes.PENDING_REQUESTS, FriendController.getPendingRequests);
router.get(FriendRoutes.OUTGOING_REQUESTS, FriendController.getOutgoingRequests);
router.post(FriendRoutes.CREATE_REQUEST, validateCreateFR, FriendController.createFriendRequest);
router.put(FriendRoutes.ACCEPT_REQUEST, FriendController.acceptFriendRequest);
router.get(FriendRoutes.GET_FRIENDS, FriendController.getFriends);
router.delete(FriendRoutes.DELETE_REQUEST, FriendController.deleteFriendRequest);

export default router;
