import authRoutes from 'controllers/Auth/auth.route';
import userRoutes from 'controllers/User/user.route';
import roomRoutes from 'controllers/Room/room.route';
import friendRoutes from 'controllers/Friend/friend.route';
import messageRoutes from 'controllers/Message/message.route';
import { AuthGuard } from 'shared/auth.guard';
import { AsyncRouter } from 'express-async-router';
import { ApiRoutes } from 'config/constants/api-routes';

const router = AsyncRouter();

router.use(ApiRoutes.AUTH, authRoutes);
router.use(ApiRoutes.USER, AuthGuard, userRoutes);
router.use(ApiRoutes.ROOM, AuthGuard, roomRoutes);
router.use(ApiRoutes.FRIEND, AuthGuard, friendRoutes);
router.use(ApiRoutes.MESSAGE, AuthGuard, messageRoutes);

export default router;
