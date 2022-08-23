import { WS } from '@discord/types';
import { AppDispatch, AppState } from 'src/store/store';
import * as Ready from './ready';
import * as Connect from './native/connect';
import * as ConnectError from './native/connect-error';
import * as MessageCreate from './messages/message-create';
import * as MessageUpdate from './messages/message-update';
import * as PresenceUpdate from './users/presence-update';
import * as FriendAdded from './friends/friend-added';
import * as FriendRemove from './friends/friend-remove';
import * as RequestCreate from './requests/request-create';
import * as RequestRemove from './requests/request-remove';
import * as TypingStart from './typing/typing-start';
import * as TypingStop from './typing/typing-stop';
import * as UserUpdate from './users/user-update';
import * as ChannelDisplay from './channels/channel-display';
import * as ChannelHide from './channels/channel-hide';

type OnWS = WS.From & {
  connect: any;
  connect_error: any;
};

export interface WSEvent<T extends keyof OnWS> {
  on: T;
  invoke: (state: AppState, dispatch: AppDispatch, args: OnWS[T]) => any;
}

export default [
  Ready.default,
  Connect.default,
  ConnectError.default,
  MessageCreate.default,
  MessageUpdate.default,
  PresenceUpdate.default,
  FriendAdded.default,
  RequestCreate.default,
  RequestRemove.default,
  TypingStart.default,
  TypingStop.default,
  UserUpdate.default,
  ChannelDisplay.default,
  ChannelHide.default,
  FriendRemove.default,
];
