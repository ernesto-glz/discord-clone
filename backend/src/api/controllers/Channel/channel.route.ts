import { ChannelController } from 'api/controllers/Channel/channel.controller';
import { AsyncRouter } from 'express-async-router';
import { ApiRoutes } from 'config/constants/api-routes';
import { validateCreateChannel } from './validations/channel.validation';

const router = AsyncRouter();

router.post(ApiRoutes['CHANNEL']['CREATE_CHANNEL'], validateCreateChannel, ChannelController.createDM);
router.get(ApiRoutes['CHANNEL']['GET_CHANNELS'], ChannelController.getAll);
router.get(ApiRoutes['CHANNEL']['GET_CHANNEL_BY_ID'], ChannelController.getById);

export default router;
