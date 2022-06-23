import authRoutes from 'api/controllers/Auth/auth.route';
import userRoutes from 'api/controllers/User/user.route';
import channelRoutes from 'api/controllers/Channel/channel.route';
import friendRoutes from 'api/controllers/Friend/friend.route';
import messageRoutes from 'api/controllers/Message/message.route';
import { AuthGuard } from 'shared/auth.guard';
import { AsyncRouter } from 'express-async-router';

const router = AsyncRouter();

router.use(authRoutes);
router.use(AuthGuard, userRoutes);
router.use(AuthGuard, channelRoutes);
router.use(AuthGuard, friendRoutes);
router.use(AuthGuard, messageRoutes);

export default router;
