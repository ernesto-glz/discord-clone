import { AsyncRouter } from 'express-async-router';
import { AuthService } from 'api/services/auth-service';
import { Auth } from 'shared/auth';
import { ApiError } from 'api/modules/api-error';
import { validateLogin, validateRegister } from 'api/validations/auth-validations';
import { AuthGuard } from 'api/middleware/auth-guard';

export const router = AsyncRouter();

router.post('/login', validateLogin, async (req, res) => {
  const { email, password } = req.body;
  const user = await AuthService.signIn(email, password);
  Auth.createToken(user, 200, res);
});

router.post('/register', validateRegister, async (req, res) => {
  const { username, password, email } = req.body;
  const user = await AuthService.signUp(username, password, email);
  Auth.createToken(user, 201, res);
});

router.patch('/change-username', AuthGuard, async (req, res) => {
  const { email } = res.locals.user;
  const { newUsername, password } = req.body;
  const selfUser = await app.users.findWithPassword(email);

  if (!selfUser || !(await Auth.checkCredentials(password, selfUser.password)))
    throw new ApiError(401, 'Password does not match');

  const userExists = await app.users.findOne({
    username: newUsername,
    discriminator: selfUser.discriminator
  });

  const discriminator = userExists 
    ? await AuthService.calcDiscriminator(selfUser.username)
    : selfUser.discriminator;
  
  await app.users.updateOne({ _id: selfUser.id }, { 
    username: newUsername,
    discriminator: discriminator.toString().padStart(4, '0') 
  });

  const user = await app.users.findById(selfUser.id);
  const secured = app.users.secure(user!);

  res.status(200).json({
    userId: selfUser.id,
    partialUser: secured
  });
});
