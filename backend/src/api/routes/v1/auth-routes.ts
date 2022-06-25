import { validateLogin, validateRegister } from 'api/validations/auth-validations';
import { AsyncRouter } from 'express-async-router';
import { ApiRoutes } from 'config/constants/api-routes';
import { AuthService } from 'api/services/auth-service';
import { Auth } from 'shared/auth';
import { ApiError } from 'api/errors/ApiError';
import { ApiResponses } from 'config/constants/api-responses';

const router = AsyncRouter();

router.post(ApiRoutes['AUTH']['LOGIN'], validateLogin, async (req, res) => {
  const { email, password } = req.body;
  const user = await AuthService.signIn(email, password);
  if (!user) throw new ApiError(500, ApiResponses.USER_NOT_FOUND);
  Auth.createToken(user.toObject(), 200, res);
});

router.post(ApiRoutes['AUTH']['REGISTER'], validateRegister, async (req, res) => {
  const { username, password, email } = req.body;
  const user = await AuthService.signUp(username, password, email);
  if (!user) throw new ApiError(500, ApiResponses.USER_NOT_FOUND);
  Auth.createToken(user.toObject(), 201, res);
});

export default router;
