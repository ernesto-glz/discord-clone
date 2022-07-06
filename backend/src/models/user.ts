import { UserStatus } from 'config/constants/status';
import { UserDocument } from 'interfaces/User';
import { PaginateModel } from 'mongoose';
import { Schema, model } from 'mongoose';
import paginate from 'mongoose-paginate-v2';

export const User = model<UserDocument, PaginateModel<UserDocument>>(
  'Users',
  new Schema(
    {
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
        default: Math.floor(Math.random() * 5),
        select: true
      },
      guildIds: {
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
      hiddenDMChannels: {
        type: [String],
        ref: 'Channels',
        default: []
      }
    },
    { versionKey: false }
  ).plugin(paginate)
);
