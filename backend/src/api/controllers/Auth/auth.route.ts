import { validateLogin, validateRegister } from 'api/controllers/Auth/validations/auth.validation';
import { AuthController } from './auth.controller';
import { AsyncRouter } from 'express-async-router';
import { ApiRoutes } from '../../../config/constants/api-routes';

const router = AsyncRouter();

router.post(ApiRoutes['AUTH']['LOGIN'], validateLogin, AuthController.signIn);
router.post(ApiRoutes['AUTH']['REGISTER'], validateRegister, AuthController.signUp);

export default router;
