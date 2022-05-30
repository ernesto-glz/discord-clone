import mongoose, { model, Schema } from 'mongoose';
import { FriendStatus } from 'config/constants/friend-status';
import paginate from 'mongoose-paginate-v2';
import { FriendDocument } from 'interfaces/Friend';

const friendSchema = new Schema(
  {
    from: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true
    },
    to: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true
    },
    friend_status: {
      type: String,
      enum: Object.values(FriendStatus),
      default: FriendStatus.PENDING
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

friendSchema.plugin(paginate);

export const Friend = model<
  FriendDocument,
  mongoose.PaginateModel<FriendDocument>
>('Friend', friendSchema);
