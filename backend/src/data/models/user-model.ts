import { Schema, model, Document } from 'mongoose';
import { UserTypes } from '@dclone/types';
import { transformUser } from 'src/utils/utilts';
import { patterns } from 'src/shared/patterns';

export interface UserDocument extends Document, UserTypes.Self {
  id: string;
  password: string;
}
const UserStatus = { ONLINE: 'ONLINE', OFFLINE: 'OFFLINE' };

export const User = model<UserDocument>('user', new Schema({
  _id: {
    type: String,
    required: [true, 'Id is required'],
    validate: [patterns.snowflake, 'Invalid snowflake id']
  },
  username: {
    type: String,
    required: [true, 'Username is required'],
    trim: true,
    validate: [patterns.username, 'Invalid username']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    unique: true,
    lowercase: true,
    validate: [patterns.email, 'Invalid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [5, 'Password too low'],
    trim: true,
    select: false,
    validate: [patterns.password, 'Invalid password']
  },
  discriminator: {
    type: String,
    required: [true, 'Discriminator is required']
  },
  avatar: {
    type: String,
    required: [true, 'Avatar URL is required']
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
    default: 'OFFLINE',
    validate: [patterns.status, 'Invalid status']
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
