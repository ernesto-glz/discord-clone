import { WS } from '@discord/types';
import { Socket } from 'socket.io';
import { User } from 'src/data/models/user-model';
import { WSGateway } from '../websocket';
import { WSEvent } from './ws-event';

export default class implements WSEvent<'CHANNEL_HIDE'> {
  public on = 'CHANNEL_HIDE' as const;

  public async invoke(ws: WSGateway, client: Socket, { channelId }: WS.Params.ChannelUpdate) {
    const userId = ws.sessions.userId(client) ?? '';
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
