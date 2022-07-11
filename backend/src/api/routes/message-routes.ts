import { AsyncRouter } from 'express-async-router';
import { validateCreateMessage } from 'api/validations/message-validations';
import { MessageService } from 'api/services/message-service';
import { Entity } from '@discord/types';

export const router = AsyncRouter();

router.post('/', validateCreateMessage, async (req, res) => {
  const { channelId, content } = req.body;
  const { user } = res.locals;

  const newMessage = await MessageService.create({
    sender: user.id,
    content,
    channelId
  } as Entity.Message);

  res.status(200).send(newMessage);
});