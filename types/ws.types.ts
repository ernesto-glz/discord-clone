export declare namespace WS {
  export interface Events {
    READY: any;
    PRESENCE_UPDATE: Args.PresenceUpdate;
    FRIEND_REQUEST_ACCEPT: any;
    FRIEND_REQUEST_CREATE: any;
    FRIEND_REQUEST_REMOVE: any;
    CHANNEL_HIDE: Params.ChannelHide;
    CHANNEL_DISPLAY: Params.ChannelDisplay;
    MESSAGE_CREATE: Params.MessageCreate;
    TYPING_START: Params.Typing;
    TYPING_STOP: Params.Typing;
    disconnect: any;
    error: object;
  }

  export namespace Params {
    export interface ChannelHide {
      channelId: string;
    }
    export interface ChannelDisplay {
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
  }

  export namespace Args {
    export interface PresenceUpdate {
      userId: string;
      status: "ONLINE" | "OFFLINE";
    }
  }
}
