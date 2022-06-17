import { ChannelTypes } from 'config/constants/status';
import { ChannelDocument } from 'interfaces/Channel';
import mongoose, { Schema, model } from 'mongoose';
import paginate from 'mongoose-paginate-v2';

const schema = new Schema(
  {
    guildId: {
      type: String
    },
    createdBy: {
      type: String,
      ref: 'User',
      required: true
    },
    firstMessageId: {
      type: String
    },
    lastMessageId: {
      type: String
    },
    position: {
      type: Number
    },
    type: {
      type: String,
      enum: Object.values(ChannelTypes),
      required: true
    },
    userIds: {
      type: [String],
      default: [],
      ref: 'User'
    }
  },
  { versionKey: false }
);

schema.plugin(paginate);

export const Channel = model<
  ChannelDocument,
  mongoose.PaginateModel<ChannelDocument>
>('Channel', schema);
