export declare namespace WS {
  export interface From {
    /** Called when a user goes online or offline. */
    PRESENCE_UPDATE: Args.PresenceUpdate;
    error: object;
  }
  export interface To {
    READY: any;
    /** Called when a user goes online or offline. */
    PRESENCE_UPDATE: Args.PresenceUpdate;
    NEW_FRIEND_REQUEST: any;
  }
  export interface On {
    disconnect: any;
  }

  export namespace Params {}

  export namespace Args {
    export interface PresenceUpdate {
      userId: string;
      status: "ONLINE" | "OFFLINE";
    }
  }
}
