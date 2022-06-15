import {
  validateLogin,
  validateRegister
} from 'controllers/Auth/validations/auth.validation';
import { AuthController } from './auth.controller';
import { AsyncRouter } from 'express-async-router';
import { AuthRoutes } from '../../config/constants/api-routes';

const router = AsyncRouter();

router.post(AuthRoutes.LOGIN, validateLogin, AuthController.signIn);
router.post(AuthRoutes.REGISTER, validateRegister, AuthController.signUp);

export default router;
