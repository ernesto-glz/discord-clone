import { MessageDocument } from 'interfaces/Message';
import { model, Schema, PaginateModel } from 'mongoose';
import paginate from 'mongoose-paginate-v2';

export const Message = model<MessageDocument, PaginateModel<MessageDocument>>(
  'Message',
  new Schema(
    {
      _id: {
        type: String,
        required: true
      },
      sender: {
        type: String,
        ref: 'User',
        required: true
      },
      channelId: {
        type: String,
        ref: 'Channel',
        required: true
      },
      content: {
        type: String,
        required: true
      },
      message_reference: {
        type: String
      }
    },
    { timestamps: true, versionKey: false }
  ).plugin(paginate)
);
