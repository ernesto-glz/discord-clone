import { Entity } from "./entity.types";

export declare namespace WS {
  export interface To {
    READY: Params.Ready;
    FRIEND_REQUEST_ACCEPT: any;
    FRIEND_REQUEST_CREATE: Params.RequestCreate;
    FRIEND_REQUEST_REMOVE: Params.RequestRemove;
    CHANNEL_HIDE: Params.ChannelUpdate;
    CHANNEL_DISPLAY: Params.ChannelUpdate;
    MESSAGE_CREATE: Params.MessageCreate;
    TYPING_START: Params.Typing;
    TYPING_STOP: Params.Typing;
    NEW_FRIEND: any;
    disconnect: any;
  }

  export interface From {
    /* Called when app is ready */
    READY: any;
    /* Called when user goes online/offline */
    PRESENCE_UPDATE: Args.PresenceUpdate;
    /* Called when friend request is accepted */
    FRIEND_REQUEST_ACCEPT: Params.RequestAccept;
    /* Called when friend request is created */
    FRIEND_REQUEST_CREATE: Params.RequestCreate;
    /* Called when friend request is denied or cancelled */
    FRIEND_REQUEST_REMOVE: Params.RequestRemove;
    /* Called when a channel of type DM is hiddened by user */
    CHANNEL_HIDE: Args.ChannelUpdate;
    /* Called when a channel of type DM is displayed by user  */
    CHANNEL_DISPLAY: Args.ChannelUpdate;
    /* Called when a message is created  */
    MESSAGE_CREATE: Args.MessageCreate;
    /* Called when a user in room start typing  */
    TYPING_START: Args.Typing;
    /* Called when a user in room stop typing  */
    TYPING_STOP: Args.Typing;
    /* Called when new friend is added  */
    NEW_FRIEND: any;
    /* obvious :L */
    error: object;
  }

  export namespace Params {
    export interface ChannelUpdate {
      channelId: string;
    }

    export interface MessageCreate {
      channelId: string;
      content: string;
    }

    export interface Typing {
      channelId: string;
    }

    export interface RequestCreate {
      request: Entity.Request;
    }

    export interface RequestRemove {
      request: Entity.Request;
    }

    export interface RequestAccept {
      requestId: string;
      friendId: string;
      channel: Entity.Channel;
    }

    export interface Ready {
      jwt: string;
    }
  }

  export namespace Args {
    export interface PresenceUpdate {
      userId: string;
      status: Entity.UserTypes.StatusType;
    }

    export interface MessageCreate {
      id: string;
      sender: string;
      channelId: string;
      guildId: string;
      content: string;
    }

    export interface Typing {
      userId: string;
      channelId: string;
    }

    export interface PresenceUpdate {
      userId: string;
      status: Entity.UserTypes.StatusType;
    }

    export interface ChannelUpdate {
      channelId: string;
    }

    export interface RequestCreate {
      request: Entity.Request;
    }

    export interface RequestRemove {
      requestId: string;
    }
  }
}
