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
