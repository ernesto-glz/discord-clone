export declare namespace WS {
  export interface From {
    /** Called when a user goes online or offline. */
    PRESENCE_UPDATE: Args.PresenceUpdate;
    error: object;
  }
  export interface To {
    READY: any;
    PRESENCE_UPDATE: Args.PresenceUpdate;
    FRIEND_REQUEST_ACCEPT: any;
    FRIEND_REQUEST_CREATE: any;
    FRIEND_REQUEST_REMOVE: any;
    CHANNEL_HIDE: Params.ChannelHide;
    CHANNEL_DISPLAY: Params.ChannelDisplay;
  }
  export interface On {
    disconnect: any;
  }

  export namespace Params {
    export interface ChannelHide {
      channelId: string;
    }
    export interface ChannelDisplay {
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
