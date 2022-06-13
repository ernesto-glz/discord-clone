import { Document } from 'mongoose';

export interface Room {
  _id: string;
  sender: string;
  receiver: string;
  createdBy: string;
}

export interface CreateRoom {
  userId: string;
  receiverId: string;
}

export type RoomDocument = Room & Document;
