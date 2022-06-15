import { ChannelController } from 'controllers/Channel/channel.controller';
import { AsyncRouter } from 'express-async-router';
import { ChannelRoutes } from 'config/constants/api-routes';
import { validateCreateChannel } from './validations/channel.validation';

const router = AsyncRouter();
const { createDM, getAll, getById } = ChannelController;

router.post(ChannelRoutes.CREATE_CHANNEL, validateCreateChannel, createDM);
router.get(ChannelRoutes.GET_CHANNELS, getAll);
router.get(ChannelRoutes.GET_CHANNEL_BY_ID, getById);

export default router;
