import { generateSnowflake } from 'src/utils/snowflake';
import { Channel } from '../channel-model';
import { longString, mongooseError } from './utils';

test('Channel model', () => {
  expect(createChannel({})).toEqual(true);
  expect(createChannel({ _id: '' })).toEqual('Id is required');
  expect(createChannel({ _id: '123' })).toEqual('Invalid snowflake id');
  expect(createChannel({ _id: generateSnowflake() })).toEqual(true);
  expect(createChannel({ name: longString(33) })).toEqual('Name is too long');
  expect(createChannel({ guildId: '123' })).toEqual('Invalid snowflake id');
  expect(createChannel({ createdBy: '' })).toEqual('CreatedBy is required');
  expect(createChannel({ createdBy: '123' })).toEqual('Invalid snowflake id');
  expect(createChannel({ createdBy: generateSnowflake() })).toEqual(true);
  expect(createChannel({ lastMessageId: '3' })).toEqual('Invalid snowflake id');
  expect(createChannel({ type: '' })).toEqual('Type is required');
  expect(createChannel({ type: '3' })).toEqual('Invalid type');
  expect(createChannel({ type: 'DM' })).toEqual(true);
  expect(createChannel({ type: 'GUILD_TEXT' })).toEqual(true);
  expect(createChannel({ type: 'GUILD_VOICE' })).toEqual(true);
});

const createChannel = (request: any) => {
  const error = new Channel({
    _id: generateSnowflake(),
    type: 'DM',
    createdBy: generateSnowflake(),
    ...request
  }).validateSync();

  return mongooseError(error);
};
