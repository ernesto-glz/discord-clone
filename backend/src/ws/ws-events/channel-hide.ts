import { WS } from '@discord/types';
import { Socket } from 'socket.io';
import { User } from 'src/data/models/user-model';
import { WSEvent } from './ws-event';

export default class implements WSEvent<'CHANNEL_HIDE'> {
  public on = 'CHANNEL_HIDE' as const;

  public async invoke(client: Socket, { channelId }: WS.Params.ChannelUpdate) {
    const userId = ws.sessions.userId(client);
    
    if (!userId)
      throw new Error('User is not logged in');
    
    await User.updateOne({ _id: userId }, { 
      $pull: { activeDMCS: channelId } 
    });

    return [{
      emit: this.on,
      to: [client.id],
      send: { channelId }
    }];
  }
}
