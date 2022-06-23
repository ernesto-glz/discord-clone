import { MessageDocument } from 'interfaces/Message';
import { Message } from 'models/message';
import { Repository } from './Base';

export class MessageRepository extends Repository<MessageDocument> {
  constructor() {
    super(Message);
  }
}
