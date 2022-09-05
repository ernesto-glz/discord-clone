import { WS } from '@dclone/types';
import { Socket } from 'socket.io';
import { WSEvent } from './ws-event';

export default class implements WSEvent<'MESSAGE_DELETE'> {
  public on = 'MESSAGE_DELETE' as const;

  public async invoke(client: Socket, { messageId, channelId }: WS.Params.MessageDelete) {
    /**
     * For now just notify when the message is deleted via API
     */

    return [{
      emit: this.on,
      to: [channelId],
      send: { messageId, channelId }
    }];
  }
}
