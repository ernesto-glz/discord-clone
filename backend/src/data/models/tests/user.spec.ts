import { generateSnowflake } from '../../../utils/snowflake';
import { User } from '../user-model';
import { mongooseError } from './utils';

test('User model', () => {
  expect(createUser({})).toEqual(true);
  expect(createUser({ _id: '' })).toEqual('Id is required');
  expect(createUser({ _id: '123' })).toEqual('Invalid snowflake id');
  expect(createUser({ _id: generateSnowflake() })).toEqual(true);
  expect(createUser({ avatar: '' })).toEqual('Avatar URL is required');
  expect(createUser({ discriminator: '' })).toEqual('Discriminator is required');
  expect(createUser({ username: undefined })).toEqual('Username is required');
  expect(createUser({ username: '/*--=' })).toEqual('Invalid username');
  expect(createUser({ username: 'testUser' })).toEqual(true);
  expect(createUser({ username: 'test-user' })).toEqual(true);
  expect(createUser({ password: undefined })).toEqual('Password is required');
  expect(createUser({ password: '123' })).toEqual('Password too low');
  expect(createUser({ email: undefined })).toEqual('Email is required');
  expect(createUser({ email: '123' })).toEqual('Invalid email');
  expect(createUser({ email: 'sdf@ghh' })).toEqual('Invalid email');
  expect(createUser({ email: 'sdf@ghh.' })).toEqual('Invalid email');
  expect(createUser({ email: 'test@gmail.com' })).toEqual(true);
  expect(createUser({ status: 'sgtd' })).toEqual('Invalid status');
  expect(createUser({ status: 'ONLINE' })).toEqual(true);
  expect(createUser({ status: 'OFFLINE' })).toEqual(true);
});

const createUser = (user: any) => {
  const error = new User({
    _id: generateSnowflake(),
    username: `user-${generateSnowflake()}`,
    discriminator: '3333',
    avatar: '3',
    password: '12345',
    email: `${generateSnowflake()}@gmail.com`,
    ...user
  }).validateSync();

  return mongooseError(error);
};
