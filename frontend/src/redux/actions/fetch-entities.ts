import { fetchedEntities } from '../states/meta';
import { actions as api } from '../states/api';
import { actions as friends } from '../states/friend';
import { actions as users } from '../states/users';
import { actions as requests } from '../states/requests';
import { actions as channels } from '../states/channels';
import { store } from '../configure-store';
import { Dispatch } from '@reduxjs/toolkit';

export default () => async (dispatch: Dispatch<any>) => {
  if (store.getState().meta.fetchedEntities) return;

  dispatch(api.restCallBegan({
    onSuccess: [],
    url: '/users/entities',
    callback: (data) => {
      dispatch(users.fetched(data.users));
      dispatch(friends.fetched(data.friends));
      dispatch(channels.fetched(data.channels));
      dispatch(requests.fetchedIncoming(data.incoming));
      dispatch(requests.fetchedOutgoing(data.outgoing));
      setTimeout(() => dispatch(fetchedEntities()), 1000);    
    }
  }))
};
