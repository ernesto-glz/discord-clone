import { Entity, RequestTypes, UserTypes } from "./entity.types";

export declare namespace WS {
  export interface To {
    /*
     * - Get the necessary entities to load the application.
     * - Join user rooms.
     * - Set online status.
     */
    READY: Params.Ready;
    /* Send a friend request to a user */
    FRIEND_REQUEST_CREATE: Params.RequestCreate;
    /* Accept a friend request from a user */
    FRIEND_REQUEST_ACCEPT: Params.RequestAccept;
    /*
     * - Deny friend request from a user.
     * - Cancel friend request sent to a user.
     */
    FRIEND_REQUEST_REMOVE: Params.RequestRemove;
    /*
     * - Hide a channel of type DM.
     * - Will be shown if you receive any message in that channel.
     */
    CHANNEL_HIDE: Params.ChannelUpdate;
    /*  Show a channel of type DM. */
    CHANNEL_DISPLAY: Params.ChannelUpdate;
    /* Create a message in a channel */
    MESSAGE_CREATE: Params.MessageCreate;
    /* Update an existing message in a channel */
    MESSAGE_UPDATE: Params.MessageUpdate;
    /* Indicate that you are typing in a channel. */
    TYPING_START: Params.Typing;
    /* Indicates that you stopped writing in a channel. */
    TYPING_STOP: Params.Typing;
    /* Update a user with a given token. */
    USER_UPDATE: Params.UserUpdate;
    /* Remove a friend */
    FRIEND_REMOVE: Params.FriendRemove;
    /* Manually disconnect from the websocket. */
    disconnect: any;
  }

  export interface From {
    /* Called when app is ready */
    READY: Args.Ready;
    /* Called when user goes online/offline */
    PRESENCE_UPDATE: Args.PresenceUpdate;
    /* Called when friend request is created */
    FRIEND_REQUEST_CREATE: Args.RequestCreate;
    /* Called when friend request is denied or cancelled */
    FRIEND_REQUEST_REMOVE: Args.RequestRemove;
    /* Called when a channel of type DM is hiddened by user */
    CHANNEL_HIDE: Args.ChannelUpdate;
    /* Called when a channel of type DM is displayed by user  */
    CHANNEL_DISPLAY: Args.ChannelUpdate;
    /* Called when a message is created  */
    MESSAGE_CREATE: Args.MessageCreate;
    /* Called when a message is updated  */
    MESSAGE_UPDATE: Args.MessageUpdate;
    /* Called when a user in room start typing  */
    TYPING_START: Args.Typing;
    /* Called when a user in room stop typing  */
    TYPING_STOP: Args.Typing;
    /* Called when new friend is added  */
    FRIEND_ADDED: Args.FriendAdded;
    /* Called when a user is updated (email, username) */
    USER_UPDATE: Args.UserUpdate;
    /* Called when a friend is removed */
    FRIEND_REMOVE: Args.FriendRemove;
    /* obvious :L */
    error: object;
  }

  export namespace Params {
    export interface Ready {
      token: string;
    }

    export interface RequestCreate {
      request: RequestTypes.Populated;
    }

    export interface RequestAccept {
      request: RequestTypes.Populated;
      friendId: string;
      channel: Entity.Channel;
    }

    export interface RequestRemove {
      request: RequestTypes.Populated;
    }

    export interface ChannelUpdate {
      channelId: string;
    }

    export interface MessageCreate {
      channelId: string;
      content: string;
    }

    export interface MessageUpdate {
      messageId: string;
      content?: string;
    }

    export interface Typing {
      channelId: string;
    }

    export interface UserUpdate {
      token: string;
      partialUser: Partial<UserTypes.Self>;
    }

    export interface FriendRemove {
      token: string;
      userId: string;
    }
  }

  export namespace Args {
    export interface Ready {
      user: UserTypes.Self;
    }

    export interface PresenceUpdate {
      userId: string;
      status: UserTypes.StatusType;
    }

    export interface RequestCreate {
      request: RequestTypes.Populated;
    }

    export interface RequestRemove {
      requestId: string;
    }

    export interface MessageCreate {
      message: Entity.Message;
    }

    export interface FriendAdded {
      requestId: string;
      user: Entity.User;
      channel: Entity.Channel;
    }

    export interface MessageCreate {
      id: string;
      sender: string;
      channelId: string;
      guildId: string;
      content: string;
    }

    export interface MessageUpdate {
      messageId: string;
      partialMessage: Entity.Message;
    }

    export interface Typing {
      userId: string;
      channelId: string;
    }

    export interface PresenceUpdate {
      userId: string;
      status: UserTypes.StatusType;
    }

    export interface ChannelUpdate {
      channelId: string;
    }

    export interface UserUpdate {
      userId: string;
      partialUser: Partial<UserTypes.Self>;
    }

    export interface FriendRemove {
      userId: string;
    }
  }
}
