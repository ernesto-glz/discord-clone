import { AsyncRouter } from 'express-async-router';
import { validateCreateMessage } from 'api/validations/message-validations';
import { ApiRoutes } from 'config/constants/api-routes';
import { MessageService } from 'api/services/message-service';
import { Message } from 'interfaces/Message';

const router = AsyncRouter();

router.get(ApiRoutes['MESSAGE']['GET_MESSAGES'], async (req, res) => {
  const { user } = res.locals;
  const { channelId } = req.params;
  const { limit, page } = req.query;

  const perPage = limit ? parseInt(limit.toString(), 10) : 30;
  const selectedPage = page ? parseInt(page.toString()) : 1;

  const messages = await MessageService.getPaginated(channelId, user._id, perPage, selectedPage);
  res.status(200).send(messages);
});

router.post(ApiRoutes['MESSAGE']['CREATE_MESSAGE'], validateCreateMessage, async (req, res) => {
  const { channelId, content } = req.body;
  const { user } = res.locals;

  const newMessage = await MessageService.create({
    sender: user._id,
    content,
    channelId
  } as Message);

  res.status(200).send(newMessage);
});

export default router;
