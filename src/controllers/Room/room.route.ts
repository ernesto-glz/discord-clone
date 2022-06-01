import { RoomController } from 'controllers/Room/room.controller';
import { AsyncRouter } from 'express-async-router';
import { RoomRoutes } from 'config/constants/api-routes';
import { validateCreateRoom } from './validations/room.validation';

const router = AsyncRouter();

router.post(
  RoomRoutes.CREATE_ROOM,
  validateCreateRoom,
  RoomController.createRoom
);
router.get(RoomRoutes.GET_ROOMS, RoomController.getAllRooms);
router.delete(RoomRoutes.DELETE_ROOM, RoomController.deleteRoom);
router.get(RoomRoutes.GET_ROOM_BY_ID, RoomController.getRoomById);

export default router;
