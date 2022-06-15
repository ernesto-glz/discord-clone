import { Document } from 'mongoose';

export interface Channel {
  _id: string;
  sender: string;
  receiver: string;
  createdBy: string;
}

export interface CreateChannel {
  userId: string;
  receiverId: string;
}

export interface CreateDMChannel {
  guildId: string;
  myId: string;
  userId: string;
}

export type ChannelDocument = Channel & Document;
