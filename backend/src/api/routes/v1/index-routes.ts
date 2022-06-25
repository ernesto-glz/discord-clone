import authRoutes from './auth-routes';
import channelRoutes from './channel-routes';
import friendRoutes from './friend-routes';
import messageRoutes from './message-routes';
import userRoutes from './user-routes';
import { AuthGuard } from 'shared/auth.guard';
import { AsyncRouter } from 'express-async-router';

const router = AsyncRouter();

router.use(authRoutes);
router.use(AuthGuard, userRoutes);
router.use(AuthGuard, channelRoutes);
router.use(AuthGuard, friendRoutes);
router.use(AuthGuard, messageRoutes);

export default router;
