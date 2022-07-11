import { router as authRouter } from './auth-routes';
import { router as requestRouter } from './request-routes';
import { router as channelRouter } from './channel-routes';
import { router as messageRouter } from './message-routes';
import { router as userRouter } from './user-routes';
import { AuthGuard } from 'api/middleware/auth-guard';
import { AsyncRouter } from 'express-async-router';

const router = AsyncRouter();

router.use('/auth', authRouter);
router.use('/users', AuthGuard, userRouter);
router.use('/channels', AuthGuard, channelRouter);
router.use('/requests', AuthGuard, requestRouter);
router.use('/messages', AuthGuard, messageRouter);

export default router;
