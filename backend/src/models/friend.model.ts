import mongoose, { model, Schema } from 'mongoose';
import { FriendStatus } from 'config/constants/status';
import paginate from 'mongoose-paginate-v2';
import { FriendDocument } from 'interfaces/Friend';

const friendSchema = new Schema(
  {
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
    friend_status: {
      type: String,
      enum: Object.values(FriendStatus),
      default: FriendStatus.PENDING
    }
  },
  { versionKey: false }
);

friendSchema.plugin(paginate);

export const Friend = model<FriendDocument, mongoose.PaginateModel<FriendDocument>>(
  'Friend',
  friendSchema
);
