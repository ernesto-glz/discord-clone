import { AsyncRouter } from 'express-async-router';
import { UserController } from 'api/controllers/User/user.controller';
import { ApiRoutes } from '../../../config/constants/api-routes';

const router = AsyncRouter();

router.get(ApiRoutes['USER']['GET_USER'], UserController.getUser);
router.get(ApiRoutes['USER']['GET_SELF_USER'], UserController.getSelfUser);

export default router;
