import { MessageDocument } from 'interfaces/Message';
import mongoose, { model, Schema } from 'mongoose';
import paginate from 'mongoose-paginate-v2';

const messageSchema = new Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    channelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Channel',
      required: true
    },
    content: {
      type: String
    }
  },
  { timestamps: true, versionKey: false }
);

messageSchema.plugin(paginate);

export const Message = model<
  MessageDocument,
  mongoose.PaginateModel<MessageDocument>
>('Message', messageSchema);
