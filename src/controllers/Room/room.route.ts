import { RoomController } from 'controllers/Room/room.controller';
import { AsyncRouter } from 'express-async-router';
import { RoomRoutes } from 'config/constants/api-routes';
import { validateCreateRoom } from './validations/room.validation';

const router = AsyncRouter();

router.post(RoomRoutes.CREATE_ROOM, validateCreateRoom, RoomController.createRoom);
router.get(RoomRoutes.GET_ROOMS, RoomController.getAllRooms);

export default router;
