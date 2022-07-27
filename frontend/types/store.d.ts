import { Entity } from '../../types/main';

export declare namespace Store {
  export interface AppState {
    auth: {
      attemptedLogin: boolean;
      user?: Entity.UserTypes.Self;
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
    };
    users: Entity.User[];
    messages: {
      list: Entity.Message[];
      total: { [channelId: string]: number; };
    };
    friends: string[];
    requests: Entity.Request[];
    typing: { userId: string, channelId: string, timer: NodeJS.Timer }[];
  }
}
