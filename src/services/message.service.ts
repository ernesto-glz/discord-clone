import { createMessage } from 'src/api/message';
import { CreateMessage } from 'src/models/message.model';
import { loadAbort } from 'src/utils/load-abort-axios';

export class MessageService {
  static createMessage(data: CreateMessage) {
    const controller = loadAbort();
    return {
      call: createMessage(data, controller),
      controller
    };
  }
}
