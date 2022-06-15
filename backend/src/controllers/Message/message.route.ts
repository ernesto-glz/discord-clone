import { MessageController } from 'controllers/Message/message.controller';
import { AsyncRouter } from 'express-async-router';
import { validateCreateMessage } from './validations/message.validation';
import { MessageRoutes } from '../../config/constants/api-routes';

const router = AsyncRouter();

router.get(MessageRoutes.GET_MESSAGES, MessageController.getAllInChannel);
router.post(
  MessageRoutes.CREATE_MESSAGE,
  validateCreateMessage,
  MessageController.createMessage
);

export default router;
