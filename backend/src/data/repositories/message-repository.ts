import { Message, MessageDocument } from 'data/models/message';
import { Repository } from './Base';

export class MessagesRepository extends Repository<MessageDocument> {
  constructor() {
    super(Message);
  }
}
