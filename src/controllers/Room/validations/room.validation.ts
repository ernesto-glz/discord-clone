import { check } from 'express-validator';
import { RoomValidation } from 'config/constants/validation-errors';

export const validateCreateRoom = [
  check('receiverId').custom((value) => {
    if (!value) throw new Error(RoomValidation.INVALID_RECEIVER_ID);
    return true;
  })
];
