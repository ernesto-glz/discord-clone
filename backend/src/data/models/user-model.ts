import { Schema, model, Document } from 'mongoose';
import { Entity } from '@discord/types';
import { transformUser } from 'src/utils/utilts';

export interface UserDocument extends Document, Entity.UserTypes.Self {
  id: string;
  password: string;
}
const UserStatus = { ONLINE: 'ONLINE', OFFLINE: 'OFFLINE' };

export const User = model<UserDocument>('user', new Schema({
  _id: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    trim: true,
    select: false,
    minlength: 5
  },
  discriminator: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    required: true
  },
  guildIds: {
    type: [String]
  },
  friendIds: {
    type: [String]
  },
  lastReadMessageIds: {
    type: Object,
    default: {}
  },
  status: {
    type: String,
    enum: Object.values(UserStatus),
    default: 'OFFLINE'
  },
  activeDMCS: {
    type: [String],
    default: []
  },
  locked: Boolean
},
  { toJSON: { transform: transformUser }, 
    toObject: { transform: transformUser } 
  })
);
