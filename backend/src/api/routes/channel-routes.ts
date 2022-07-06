import { AsyncRouter } from 'express-async-router';
import { validateCreateChannel } from 'api/validations/channel-validations';
import { ChannelService } from 'api/services/channel-service';
import { MessageService } from 'api/services/message-service';

export const router = AsyncRouter();

router.post('/', validateCreateChannel, async (req, res) => {
  const user = res.locals.user;
  const { userId } = req.body;
  const channel = await ChannelService.createDM({
    myId: user._id,
    userId
  });
  res.status(200).send(channel);
});

router.get('/:channelId', async (req, res) => {
  const { channelId } = req.params;
  const channel = await ChannelService.getById(channelId);
  res.status(200).send(channel);
});

router.get('/:channelId/messages', async (req, res) => {
  const { user } = res.locals;
  const { channelId } = req.params;
  const { limit, page } = req.query;

  const perPage = limit ? parseInt(limit.toString(), 10) : 30;
  const selectedPage = page ? parseInt(page.toString()) : 1;

  const messages = await MessageService.getPaginated(channelId, user._id, perPage, selectedPage);
  res.status(200).send(messages);
})