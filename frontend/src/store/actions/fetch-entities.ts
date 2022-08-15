import { actions as meta } from '../states/meta';
import { actions as users } from '../states/users';
import { actions as requests } from '../states/requests';
import { actions as channels } from '../states/channels';
import { store } from '../store';
import { Dispatch } from '@reduxjs/toolkit';

export default () => async (dispatch: Dispatch<any>) => {
  if (store.getState().meta.fetchedEntities) return;

  restClient.call({
    url: '/users/entities',
    callback: (data) => {
      dispatch(users.fetched(data.users));
      dispatch(channels.fetched(data.channels));
      dispatch(requests.fetched(data.requests));
      setTimeout(() => dispatch(meta.fetchedEntities()), 1000);
    },
  });
};
