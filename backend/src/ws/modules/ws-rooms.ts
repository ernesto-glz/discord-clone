import { Socket } from 'socket.io';
import { Channel } from 'src/data/models/channel-model';
import { UserDocument } from 'src/data/models/user-model';

export class WSRooms {
  public async joinGuildRooms(user: UserDocument, client: Socket) {
    if (!user.guildIds.length) return;

    await client.join(user.guildIds);
    const channelIds = await this.getChannelIds(client, user.guildIds);
    await client.join(channelIds);
  }

  private async getChannelIds(client: Socket, guildIds: string[]) {
    const ids: string[] = [];
    const channels = await Channel.find({ guildId: { $in: guildIds } });

    if (!channels)
      throw new TypeError('No channels available to jon');

    for (const channel of channels) {
      if (channel.type === 'GUILD_VOICE') continue;
      ids.push(channel.id);
    }

    return ids;
  }
}
