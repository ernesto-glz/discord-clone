import store from 'src/redux/configure-store';

export const isOnline = (friendId: string) => {
  const friends = store.getState().friends.entities;
  const friend = friends.find((entity) => entity._id === friendId);
  return friend?.status === 'ONLINE' ? true : false;
};

export const notInArray = (arr: any[]) => (old: any) => {
  return !arr.some((e) => e._id === old._id);
};
