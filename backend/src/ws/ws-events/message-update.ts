import { Entity, WS } from '@discord/types';
import { Socket } from 'socket.io';
import { Message } from 'src/data/models/message-model';
import { WSGateway } from '../websocket';
import { WSEvent, } from './ws-event';

export default class implements WSEvent<'MESSAGE_UPDATE'> {
  public on = 'MESSAGE_UPDATE' as const;

  public async invoke(ws: WSGateway, client: Socket, { messageId, content }: WS.Params.MessageUpdate) {
    const message = await Message.findById(messageId);
    
    const partial: Partial<Entity.Message> = {};
    if (content) partial.content = content;

    Object.assign(message, partial);
    await message.save();

    return [{
      emit: this.on,
      to: [message.channelId],
      send: { messageId, partialMessage: partial },
    }];
  }
}
