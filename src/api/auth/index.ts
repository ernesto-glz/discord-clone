import { UserCredentials } from 'src/models/user.model';
import client from '../client';

export const LogIn = (
  credentials: UserCredentials,
  controller: AbortController
) =>
  client.post(
    '/auth/login',
    { email: credentials.email.value, password: credentials.password.value },
    { signal: controller.signal }
  );

export const SignUp = (
  credentials: UserCredentials,
  controller: AbortController
) =>
  client.post(
    '/auth/register',
    {
      username: credentials.username!.value,
      password: credentials.password.value,
      email: credentials.email.value
    },
    { signal: controller.signal }
  );
