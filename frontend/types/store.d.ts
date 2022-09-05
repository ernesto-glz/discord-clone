import { Entity, UserTypes, RequestTypes } from '@discord/types';

export declare namespace Store {
  export interface AppState {
    auth: {
      attemptedLogin: boolean;
      user?: UserTypes.Self;
    };
    channels: Entity.Channel[];
    meta: {
      fetchedEntities: boolean;
      hasListenedToWS: boolean;
    };
    ui: {
      activeChannel: Entity.Channel | null;
      activeGuild: string | null;
      openModals?: string[];
      friendsSection: 'ONLINE' | 'ALL' | 'PENDING' | 'ADD';
      editingMessageId?: string;
      lastScrollbarPos: { [channelId: string]: number };
      deleteMessageTarget: { messageId: string, channelId: string };
    };
    users: Entity.User[];
    messages: {
      list: Entity.Message[];
      total: { [channelId: string]: number };
    };
    friends: string[];
    requests: RequestTypes.Populated[];
    typing: { userId: string; channelId: string; timer: NodeJS.Timer }[];
  }
}
