import { Document } from 'mongoose';

export interface Channel {
  _id: string;
  guildId: string;
  createdBy: string;
  userIds: string[];
  lastMessageId: string;
}

export interface CreateChannel {
  userId: string;
  receiverId: string;
}

export interface CreateDMChannel {
  myId: string;
  userId: string;
}

export type ChannelDocument = Channel & Document;
