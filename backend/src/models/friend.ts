import { model, Schema, PaginateModel } from 'mongoose';
import { FriendStatus } from 'config/constants/status';
import paginate from 'mongoose-paginate-v2';
import { FriendDocument } from 'interfaces/Friend';

export const Friend = model<FriendDocument, PaginateModel<FriendDocument>>(
  'Friend',
  new Schema(
    {
      _id: {
        type: String,
        required: true
      },
      from: {
        type: String,
        ref: 'User',
        required: true
      },
      to: {
        type: String,
        ref: 'User',
        required: true
      },
      status: {
        type: String,
        enum: Object.values(FriendStatus),
        default: FriendStatus.PENDING
      }
    },
    { versionKey: false }
  ).plugin(paginate)
);
