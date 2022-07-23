import { AsyncRouter } from 'express-async-router';
import { Auth } from 'shared/auth';
import { ApiError } from 'api/modules/api-error';
import { validateLogin, validateRegister } from 'api/validations/auth-validations';
import { AuthGuard } from 'api/middleware/auth-guard';
import { patterns } from 'shared/patterns';
import { generateSnowflake } from 'utils/snowflake';

export const router = AsyncRouter();

router.post('/login', validateLogin, async (req, res) => {
  const { email, password } = req.body;
  
  const userFound = await app.users.findWithPassword(email);

  if (!userFound || !(await Auth.checkCredentials(password, userFound.password)))
    throw new ApiError(401, 'Email or password is invalid');
  else if (userFound.locked)
    throw new ApiError(400, 'This account is locked!');

  Auth.createToken(app.users.secure(userFound), 200, res);
});

router.post('/register', validateRegister, async (req, res) => {
  const { username, password, email } = req.body;

  const userExists = await app.users.findOne({ email });

  if (userExists)
    throw new ApiError(409, 'Email already in use!');

  if (!patterns.password.test(password))
    throw new ApiError(400, 'Password is not in a valid format.');

  const hashedPassword = await Auth.hashPassword(password);
  const discriminator = await app.users.calcDiscriminator(username);

  const created = await app.users.create({
    _id: generateSnowflake(),
    username,
    password: hashedPassword,
    email,
    avatar: Math.floor(Math.random() * 5).toString(),
    discriminator: discriminator.toString().padStart(4, '0')
  });

  Auth.createToken(app.users.secure(created), 201, res);
});

router.patch('/change-username', AuthGuard, async (req, res) => {
  const { email } = res.locals.user;
  const { newUsername, password } = req.body;
  const selfUser = await app.users.findWithPassword(email);

  if (!selfUser || !(await Auth.checkCredentials(password, selfUser.password)))
    throw new ApiError(401, 'Password does not match.');

  const userExists = await app.users.findOne({
    username: newUsername,
    discriminator: selfUser.discriminator
  });

  const discriminator = userExists 
    ? await app.users.calcDiscriminator(selfUser.username)
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

router.patch('/change-password', AuthGuard, async (req, res) => {
  const { email } = res.locals.user;
  const { currentPassword, newPassword } = req.body;
  const selfUser = await app.users.findWithPassword(email);

  if (!selfUser || !(await Auth.checkCredentials(currentPassword, selfUser.password)))
    throw new ApiError(401, 'Password does not match.');

  if (!patterns.password.test(newPassword))
    throw new ApiError(400, 'New password is not in a valid format.');
    
  const hashedPassword = await Auth.hashPassword(newPassword);
  await app.users.updateOne({ _id: selfUser.id }, { password: hashedPassword });

  res.status(200).json({ 
    response: 'Password changed successfully!' 
  });
});