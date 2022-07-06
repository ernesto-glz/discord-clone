import { MessageDocument as MessageDoc } from 'interfaces/Message';
import { model, Schema, PaginateModel as Paginate } from 'mongoose';
import paginate from 'mongoose-paginate-v2';
import { useId } from 'utils/utils';

export const Message = model<MessageDoc, Paginate<MessageDoc>>('message', new Schema({
  _id: {
    type: String,
    required: true
  },
  sender: {
    type: String,
    required: true
  },
  channelId: {
    type: String,
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
  { timestamps: true, versionKey: false, toJSON: { getters: true } })
  .plugin(paginate)
  .method('toClient', useId)
);
