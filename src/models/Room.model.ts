import { RoomDocument } from 'interfaces/Room';
import mongoose, { Schema, model } from 'mongoose';
import paginate from 'mongoose-paginate-v2';

const roomSchema = new Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  { versionKey: false }
);

roomSchema.plugin(paginate);

export const Room = model<RoomDocument, mongoose.PaginateModel<RoomDocument>>(
  'Room',
  roomSchema
);
