import { WS } from '@dclone/types';
import { Socket } from 'socket.io';
import { User } from 'src/data/models/user-model';
import { WSEvent } from './ws-event';

export default class implements WSEvent<'CHANNEL_DISPLAY'> {
  public on = 'CHANNEL_DISPLAY' as const;

  public async invoke(client: Socket, { channelId }: WS.Params.ChannelUpdate) {
    const userId = ws.sessions.userId(client) ?? '';

    const alreadyDisplayed = await User.findOne({ 
      _id: userId, 
      activeDMCS: channelId
    });

    if (!alreadyDisplayed)
      await User.updateOne({ _id: userId }, { $push: { activeDMCS: channelId } });

    return [{
      emit: this.on,
      to: [client.id],
      send: { channelId }
    }];
  }
}
