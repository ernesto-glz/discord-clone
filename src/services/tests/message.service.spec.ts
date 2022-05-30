import { RoomRepository } from 'repositories/room.repository';
import { MessageService } from '../message.service';
import { RoomDocument } from 'interfaces/Room';
import { MessageRepository } from 'repositories/message.repository';
import { ApiResponses } from 'config/constants/api-responses';
import { catchError } from 'utils';
import { ApiError } from 'errors/ApiError';

const RoomDocumentMock = {
  _id: '9',
  sender: '123',
  receiver: '321',
  createdBy: '123'
} as RoomDocument;

describe('GetAllInRoom', () => {
  it('When room not found -> Should throw ApiError', async () => {
    const mockFindRoomNull = jest.fn(() => Promise.resolve(null));
    jest.spyOn(RoomRepository.prototype, 'findOne').mockImplementation(mockFindRoomNull);
    const error = await catchError(async () => MessageService.getAllInRoom('1', '1', 30, 0));
    expect(error instanceof ApiError).toEqual(true);
    expect(mockFindRoomNull).toHaveBeenCalledTimes(1);
    expect(error.message).toEqual(ApiResponses.NO_MESSAGES_FOUND);
  });

  it('When no messages found -> Should throw ApiError', async () => {
    const mockMessagesResult = { docs: [{ id: '123' }], totalDocs: 0 } as any;
    const mockFindRoomNull = jest.fn(() => Promise.resolve(RoomDocumentMock));
    const mockFindMessagesNull = jest.fn(() => Promise.resolve(mockMessagesResult));
    jest.spyOn(RoomRepository.prototype, 'findOne').mockImplementation(mockFindRoomNull);
    jest.spyOn(MessageRepository.prototype, 'paginate').mockImplementation(mockFindMessagesNull);

    const messages = await MessageService.getAllInRoom('1', '1', 30, 0);
    expect(mockFindRoomNull).toHaveBeenCalledTimes(1);
    expect(mockFindMessagesNull).toHaveBeenCalledTimes(1);
    expect(messages).toEqual(mockMessagesResult);
  });
});