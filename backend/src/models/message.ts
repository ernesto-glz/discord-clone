import { MessageDocument } from 'interfaces/Message';
import { model, Schema, PaginateModel } from 'mongoose';
import paginate from 'mongoose-paginate-v2';

export const Message = model<MessageDocument, PaginateModel<MessageDocument>>(
  'Messages',
  new Schema(
    {
      _id: {
        type: String,
        required: true
      },
      sender: {
        type: String,
        ref: 'Users',
        required: true
      },
      channelId: {
        type: String,
        ref: 'Channels',
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
