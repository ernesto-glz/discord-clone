export declare namespace Entity {
  export interface User {
    _id: string;
    username: string;
    email: string;
    password: string;
    discriminator: string;
    status: "ONLINE" | "OFFLINE";
    guildIds: string[];
    hiddenDMChannels: string[];
    lastReadMessageIds: any;
  }
  export interface Request {
    _id: string;
    from: User;
    to: User;
    friend_status: "PENDING" | "FRIEND" | "BLOCKED";
  }
  export interface Channel {
    _id: string;
    guildId: string;
    createdBy: string;
    userIds: string[];
    lastMessageId: string;
    type: "DM" | "GUILD_TEXT" | "GUILD_VOICE";
  }
  export interface Message {}
}
