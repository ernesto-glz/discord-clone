import { Store as ReduxStore } from '@reduxjs/toolkit';
import { Entity } from '@discord/types';

export const isOnline = (userId: string, store: ReduxStore) => {
  const users = store.getState().users as Entity.User[];
  const user = users.find((entity) => entity.id === userId);
  return user?.status === 'ONLINE' ? true : false;
};

export const notInArray = (arr: any[]) => (old: any) => {
  return !arr.some((e) => e.id === old.id);
};