export declare namespace Entity {
  export interface User {
    id: string;
    username: string;
    discriminator: string;
    status: UserTypes.StatusType;
    avatar: string;
    guildIds: string[];
    friendIds: string[];
  }

  export interface Request {
    id: string;
    from: Entity.User;
    to: Entity.User;
    type?: RequestTypes.Type;
  }

  export interface Channel {
    id: string;
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
    id: string;
    sender: string;
    channelId: string;
    content: string;
    createdAt: string;
    updatedAt?: string;
  }

  export namespace UserTypes {
    export type StatusType = "ONLINE" | "OFFLINE";
    export interface Self extends Entity.User {
      email: string;
      activeDMCS: string[];
      lastReadMessageIds: { [t: string]: string };
      locked: boolean;
    }
  }

  export namespace RequestTypes {
    export type Type = "INCOMING" | "OUTGOING";
  }

  export namespace ChannelTypes {
    export type Type = "DM" | "GUILD_TEXT" | "GUILD_VOICE";
  }
}
