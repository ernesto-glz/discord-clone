import store from 'src/redux/configure-store';

export const isOnline = (friendId: string) => {
  const friends = store.getState().friends.entities;
  const friend = friends.find((entity) => entity.userId === friendId);
  return friend?.status === 'online' ? true : false;
};
