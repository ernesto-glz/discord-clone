import { RoomService } from '../room.service';
import { RoomRepository } from 'repositories/room.repository';
import { RoomDocument } from 'interfaces/Room';
import { ApiResponses } from 'config/constants/api-responses';

const RoomDocumentMock = {
  _id: '123',
  sender: '111',
  receiver: '222',
  createdBy: '111'
} as RoomDocument;

describe('GetOrCreateRoom', () => {
  it('When room already exists -> Should return existent room', async () => {
    const mockCheckExistenceTrue = jest.fn(() => Promise.resolve(RoomDocumentMock));
    jest.spyOn(RoomRepository.prototype, 'checkExistence').mockImplementation(mockCheckExistenceTrue);
    const room = await RoomService.getOrCreateRoom({ userId: '1', receiverId: '2' });
    expect(mockCheckExistenceTrue).toHaveBeenCalledTimes(1);
    expect(room).toEqual(RoomDocumentMock);
  });

  it('When room not found -> Should create and return new room', async () => {
    const mockCheckExistenceFalse = jest.fn(() => Promise.resolve(null));
    const mockCreateRoom = jest.fn(() => Promise.resolve(RoomDocumentMock));
    jest.spyOn(RoomRepository.prototype, 'checkExistence').mockImplementation(mockCheckExistenceFalse);
    jest.spyOn(RoomRepository.prototype, 'create').mockImplementation(mockCreateRoom);
    const room = await RoomService.getOrCreateRoom({ userId: '1', receiverId: '2' });
    expect(mockCheckExistenceFalse).toHaveBeenCalledTimes(1);
    expect(room).toEqual(RoomDocumentMock);
  });
});

describe('GetAllRooms', () => {
  it('When room not found -> Should throw an ApiError', async () => {
    const mockFindRoomsNull = jest.fn(() => Promise.resolve(null));
    jest.spyOn(RoomRepository.prototype, 'find').mockImplementation(mockFindRoomsNull);
    try {
      await RoomService.getAllRooms('1', false);
    } catch (e: any) {
      expect(mockFindRoomsNull).toHaveBeenCalledTimes(1);
      expect(e.message).toEqual(ApiResponses.NO_ROOMS_FOUND);
    }
  });

  it('When found rooms but 0 length -> Should return empty array', async () => {
    const mockFindRoomsEmpty = jest.fn(() => Promise.resolve([]));
    jest.spyOn(RoomRepository.prototype, 'find').mockImplementation(mockFindRoomsEmpty);
    const rooms = await RoomService.getAllRooms('1', false);
    expect(mockFindRoomsEmpty).toHaveBeenCalledTimes(1);
    expect(rooms).toEqual([]);
  });
});
