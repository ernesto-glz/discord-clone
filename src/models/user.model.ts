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
  username: string;
  email: string;
  token: string;
  avatar?: string;
}

export interface UserState {
  user: {
    username: string;
    shortId: string;
    email: string;
    token: string;
    avatar: string;
  };
}
