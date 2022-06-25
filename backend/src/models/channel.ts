import { ChannelTypes } from 'config/constants/status';
import { ChannelDocument } from 'interfaces/Channel';
import { Schema, model, PaginateModel } from 'mongoose';
import paginate from 'mongoose-paginate-v2';

export const Channel = model<ChannelDocument, PaginateModel<ChannelDocument>>(
  'Channel',
  new Schema(
    {
      _id: {
        type: String,
        required: true
      },
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
  ).plugin(paginate)
);
