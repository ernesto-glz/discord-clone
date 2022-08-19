import { generateSnowflake } from 'src/utils/snowflake';
import { Request } from '../request-model';
import { mongooseError } from './utils';

test('Request model', () => {
  expect(createRequest({})).toEqual(true);
  expect(createRequest({ _id: '' })).toEqual('Id is required');
  expect(createRequest({ _id: '123' })).toEqual('Invalid snowflake id');
  expect(createRequest({ _id: generateSnowflake() })).toEqual(true);
  expect(createRequest({ from: '' })).toEqual('From is required');
  expect(createRequest({ from: '123' })).toEqual('Invalid snowflake id');
  expect(createRequest({ from: generateSnowflake() })).toEqual(true);
  expect(createRequest({ to: '' })).toEqual('To is required');
  expect(createRequest({ to: '123' })).toEqual('Invalid snowflake id');
  expect(createRequest({ to: generateSnowflake() })).toEqual(true);
});

const createRequest = (request: any) => {
  const error = new Request({
    _id: generateSnowflake(),
    from: generateSnowflake(),
    to: generateSnowflake(),
    ...request
  }).validateSync();

  return mongooseError(error);
};
