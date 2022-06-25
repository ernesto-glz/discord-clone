export interface UserCredentials {
  username?: {
    value: string;
  };
  email: {
    value: string;
  };
  password: {
    value: string;
  };
}

export interface User {
  _id: string;
  username: string;
  email: string;
  token: string;
  discriminator: string;
  avatar?: string;
  status: 'ONLINE' | 'OFFLINE';
}
