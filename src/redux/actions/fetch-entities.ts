import store, { AppDispatch } from '../configure-store';
import { fetchChannels } from '../states/channels';
import { getAllFriends } from '../states/friend';
import { fetchedEntities } from '../states/meta';
import { getIncoming, getOutgoing } from '../states/requests';

export default () => async (dispatch: AppDispatch) => {
  if (store.getState().meta.fetchedEntities) return;
  await dispatch(fetchChannels());
  await dispatch(getAllFriends());
  await dispatch(getIncoming());
  await dispatch(getOutgoing());

  setTimeout(() => {
    dispatch(fetchedEntities());
  }, 1000);
};
