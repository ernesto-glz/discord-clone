import { AsyncRouter } from 'express-async-router';
import { UserController } from 'controllers/User/user.controller';
import { UserRoutes } from '../../config/constants/api-routes';

const router = AsyncRouter();

router.get(UserRoutes.GET_USER, UserController.getUser);
router.get(UserRoutes.GET_SELF_USER, UserController.getSelfUser);
export default router;
