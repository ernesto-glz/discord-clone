import React, { useEffect } from 'react';
import { actions as meta } from 'src/store/states/meta';
import { actions as ui } from 'src/store/states/ui';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'src/store/hooks';
import { store } from 'src/store/store';
import wsEvents from './ws-events/ws-events';

export const WSListeners: React.FC = () => {
  const ws = wsClient.client;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const state = () => store.getState();

  useEffect(() => {
    if (state().meta.hasListenedToWS) return;

    for (const WSEvent of wsEvents) {
      const event = new WSEvent();
      ws.on(event.on, (args: any) => {
        try {
          // @ts-ignore
          event.invoke.call(event, state, dispatch, args);
        } catch (e) { console.log(e) }
      });
    }

    // Aditional event listeners
    document.addEventListener('keyup', (event) => {
      if (event.key === 'Escape' && state().ui.openModals?.length)
        dispatch(ui.closedLastModal());
    });
    events.on('navigate', (path: string) => navigate(path));

    dispatch(meta.listenedToWS());
  }, []);

  return null;
};
