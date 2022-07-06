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
    };
    users: Entity.User[];
    messages: {
      entities: Entity.Message[];
      totalPages: number | null;
      page: number | null;
    };
    friends: string[];
    requests: {
      incoming: {
        entities: Entity.Request[];
      };
      outgoing: {
        entities: Entity.Request[];
      };
    };
    typing: { userId: string, channelId: string, timer: NodeJS.Timer }[];
  }
}
