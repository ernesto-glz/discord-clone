export interface CreateMessage {
  channelId: string;
  content: string;
}

export interface Message {
  _id: string;
  sender: string;
  channelId: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
  stackMessage?: boolean;
}
