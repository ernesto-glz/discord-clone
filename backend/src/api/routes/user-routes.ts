import { AsyncRouter } from 'express-async-router';
import { ApiError } from 'api/modules/api-error';
import { Auth } from 'shared/auth';

export const router = AsyncRouter();

router.delete('/', async (req, res) => {
  const { email } = res.locals.user;
  const { password } = req.body;
  const selfUser = await app.users.findWithPassword(email);

  if (!selfUser) 
    throw new ApiError(400, 'User not found');
  else if (!(await Auth.checkCredentials(password, selfUser.password)))
    throw new ApiError(401, 'Password does not match.');

  selfUser.locked ??= true;
  selfUser.username = 'Deleted User';
  selfUser.discriminator = '0000';
  await selfUser.save();

  res.status(200).json({ 
    userId: selfUser.id, 
    partialUser: app.users.secure(selfUser) 
  });
});

router.get('/entities', async (req, res) => {
  const { id: userId, guildIds } = res.locals.user;
  const $in = guildIds;

  const [channels, users, requests] = await Promise.all([
    app.channels.find({ userIds: userId }),
    app.users.find({ guildIds: { $in } }),
    app.requests.get(userId)
  ]);

  const securedUsers = users?.map((u) => app.users.secure(u));
  const filledChannels = await Promise.all(
    (channels ?? []).map(async (c) => await app.channels.fillInfo(c.toObject(), userId))
  );

  res.json({
    channels: filledChannels,
    users: securedUsers,
    requests
  });
});

router.get('/@me', async (req, res) => {
  const selfUser = res.locals;
  const result = await app.users.getSelf(selfUser.id);
  res.status(200).send(result);
});

router.get('/@me/channels', async (req, res) => {
  res.status(200).json({ message: 'Not implemented' });
});

router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  const userInfo = await app.users.findById(userId);
  res.status(200).send(userInfo);
});

router.get('/:userId/channels', async (req, res) => {
  res.status(200).json({ message: 'Not implemented' });
});
