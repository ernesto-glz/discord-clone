import { MessageController } from 'api/controllers/Message/message.controller';
import { AsyncRouter } from 'express-async-router';
import { validateCreateMessage } from './validations/message.validation';
import { ApiRoutes } from '../../../config/constants/api-routes';

const router = AsyncRouter();

router.get(ApiRoutes['MESSAGE']['GET_MESSAGES'], MessageController.getAllInChannel);
router.post(ApiRoutes['MESSAGE']['CREATE_MESSAGE'], validateCreateMessage, MessageController.createMessage);

export default router;
