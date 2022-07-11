import { Document } from 'mongoose';

export interface Channel {
  id: string;
  guildId: string;
  createdBy: string;
  userIds: string[];
  lastMessageId: string;
  type: 'DM' | 'GUILD_TEXT' | 'GUILD_VOICE';
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
