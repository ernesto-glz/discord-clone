import { generateSnowflake } from "src/utils/snowflake";
import { Message } from "../message-model";
import { longString, mongooseError } from "./utils";

test('Message model', () => {
  expect(createMessage({})).toEqual(true);
  expect(createMessage({ _id: '' })).toEqual('Id is required');
  expect(createMessage({ _id: '123' })).toEqual('Invalid snowflake id');
  expect(createMessage({ _id: generateSnowflake() })).toEqual(true);
  expect(createMessage({ sender: '' })).toEqual('Sender is required');
  expect(createMessage({ sender: '123' })).toEqual('Invalid snowflake id');
  expect(createMessage({ sender: generateSnowflake() })).toEqual(true);
  expect(createMessage({ channelId: '' })).toEqual('Channel id is required');
  expect(createMessage({ channelId: '123' })).toEqual('Invalid snowflake id');
  expect(createMessage({ channelId: generateSnowflake() })).toEqual(true);
  expect(createMessage({ content: longString(4001) })).toEqual('Content too long');
  expect(createMessage({ content: '' })).toEqual('Content is required');
});

const createMessage = (message: any) => {
  const error = new Message({
    _id: generateSnowflake(),
    sender: generateSnowflake(),
    channelId: generateSnowflake(),
    content: '123',
    ...message
  }).validateSync();

  return mongooseError(error);
};
