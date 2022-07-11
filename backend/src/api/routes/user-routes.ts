import { AsyncRouter } from 'express-async-router';
import { UserService } from 'api/services/user-service';

export const router = AsyncRouter();

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
  const result = await UserService.getUser(selfUser.id);
  res.status(200).send(result);
});

router.get('/@me/channels', async (req, res) => {
  res.status(200).json({ message: 'Not implemented' });
});

router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  const userInfo = await UserService.getUser(userId);
  res.status(200).send(userInfo);
});

router.get('/:userId/channels', async (req, res) => {
  res.status(200).json({ message: 'Not implemented' });
});
