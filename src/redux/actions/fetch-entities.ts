import store, { AppDispatch } from '../configure-store';
import { fetchDMChannels } from '../states/channels';
import { getAllFriends } from '../states/friend';
import { fetchedEntities } from '../states/meta';
import { getIncoming, getOutgoing } from '../states/requests';

export default () => async (dispatch: AppDispatch) => {
  if (store.getState().meta.fetchedEntities) return;
  await dispatch(getAllFriends());
  await dispatch(fetchDMChannels());
  await dispatch(getIncoming());
  await dispatch(getOutgoing());

  setTimeout(() => {
    dispatch(fetchedEntities());
  }, 1000);
};
