export declare namespace Entity {
  export interface User {
    _id: string;
    username: string;
    discriminator: string;
    status: UserTypes.StatusType;
    avatar: string;
    guildIds: string[];
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
    name?: string;
    avatar?: string;
    createdBy: string;
    userIds: string[];
    lastMessageId: string;
    type: ChannelTypes.Type;
    dmUserId?: string;
  }
  
  export interface Message {
    _id: string;
    sender: string;
    channelId: string;
    content: string;
    createdAt: string;
    updatedAt?: string;
    stackMessage?: boolean;
  }

  export namespace UserTypes {
    export type StatusType = "ONLINE" | "OFFLINE";
    export interface Self extends Entity.User {
      email: string;
      hiddenDMChannels: string[];
      lastReadMessageIds: { [t: string]: string };
    }
  }

  export namespace RequestTypes {
    export type Type = "INCOMING" | "OUTGOING";
    export type StatusType = "PENDING" | "FRIEND";
  }

  export namespace ChannelTypes {
    export type Type = "DM" | "GUILD_TEXT" | "GUILD_VOICE";
  }
}
