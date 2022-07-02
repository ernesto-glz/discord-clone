export declare namespace Entity {
  export interface User {
    _id: string;
    username: string;
    email: string;
    password: string;
    discriminator: string;
    status: UserTypes.StatusType;
    avatar: string;
    guildIds: string[];
    hiddenDMChannels: string[];
    lastReadMessageIds: { [t: string]: string };
  }

  export interface Request {
    _id: string;
    from: User;
    to: User;
    status: RequestTypes.StatusType;
  }

  export interface Channel {
    _id: string;
    guildId: string;
    createdBy: string;
    userIds: string[];
    lastMessageId: string;
    type: ChannelTypes.Type;
  }
  export interface Message {}

  export namespace UserTypes {
    export type StatusType = "ONLINE" | "OFFLINE";
  }

  export namespace RequestTypes {
    export type Type = "INCOMING" | "OUTGOING";
    export type StatusType = "PENDING" | "FRIEND";
  }

  export namespace ChannelTypes {
    export type Type = "DM" | "GUILD_TEXT" | "GUILD_VOICE";
  }
}
