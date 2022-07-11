import { baseModelConfig } from 'config/constants/model-config';
import { MessageDocument as MessageDoc } from 'interfaces/Message';
import { model, Schema, PaginateModel as Paginate } from 'mongoose';
import paginate from 'mongoose-paginate-v2';

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
  { ...baseModelConfig, timestamps: true })
  .plugin(paginate)
);
