import { AsyncRouter } from 'express-async-router';
import { ApiRoutes } from 'config/constants/api-routes';
import { validateCreateChannel } from 'api/validations/channel-validations';
import { ChannelService } from 'api/services/channel-service';

const router = AsyncRouter();

router.post(ApiRoutes['CHANNEL']['CREATE'], validateCreateChannel, async (req, res) => {
  const user = res.locals.user;
  const { userId } = req.body;
  const channel = await ChannelService.createDM({
    myId: user._id,
    userId
  });
  res.status(200).send(channel);
});

router.get(ApiRoutes['CHANNEL']['GET_CHANNELS'], async (req, res) => {
  const user = res.locals.user;
  const channels = await ChannelService.getAll(user._id);
  res.status(200).send(channels);
});

router.get(ApiRoutes['CHANNEL']['GET_BY_ID'], async (req, res) => {
  const { channelId } = req.params;
  const channel = await ChannelService.getById(channelId);
  res.status(200).send(channel);
});

export default router;
