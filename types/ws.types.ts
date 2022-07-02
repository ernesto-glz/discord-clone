import { Entity } from "./entity.types";

export declare namespace WS {
  export interface Events {
    READY: any;
    PRESENCE_UPDATE: Args.PresenceUpdate;
    FRIEND_REQUEST_ACCEPT: Params.RequestAccept;
    FRIEND_REQUEST_CREATE: any;
    FRIEND_REQUEST_REMOVE: any;
    CHANNEL_HIDE: Params.ChannelUpdate;
    CHANNEL_DISPLAY: Params.ChannelUpdate;
    MESSAGE_CREATE: Params.MessageCreate;
    TYPING_START: Params.Typing;
    TYPING_STOP: Params.Typing;
    NEW_FRIEND: any;
    disconnect: any;
    error: object;
  }

  export namespace Params {
    export interface ChannelUpdate {
      channelId: string;
    }

    export interface MessageCreate {
      _id: string;
      sender: string;
      channelId: string;
      guildId: string;
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
      request: Entity.Request;
      channel: Entity.Channel;
    }
  }

  export namespace Args {
    export interface PresenceUpdate {
      userId: string;
      status: "ONLINE" | "OFFLINE";
    }
  }
}
