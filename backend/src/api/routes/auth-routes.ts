import { AsyncRouter } from 'express-async-router';
import { AuthService } from 'api/services/auth-service';
import { Auth } from 'shared/auth';
import { ApiError } from 'api/modules/api-error';
import { ApiResponses } from 'config/constants/api-responses';
import { validateLogin, validateRegister } from 'api/validations/auth-validations';

export const router = AsyncRouter();

router.post('/login', validateLogin, async (req, res) => {
  const { email, password } = req.body;
  
  const user = await AuthService.signIn(email, password);
  if (!user)
    throw new ApiError(500, ApiResponses.USER_NOT_FOUND);
  
  Auth.createToken(user, 200, res);
});

router.post('/register', validateRegister, async (req, res) => {
  const { username, password, email } = req.body;
  
  const user = await AuthService.signUp(username, password, email);
  if (!user)
    throw new ApiError(500, ApiResponses.USER_NOT_FOUND);
  
  Auth.createToken(user, 201, res);
});