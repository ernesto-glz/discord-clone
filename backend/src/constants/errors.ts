export const Errors = {
  EMAIL: {
    INVALID_EMAIL_TYPE: "Not a well formed email address.",
    ALREADY_USED: "Email is already registered",
  },
  PASSWORD: {
    INVALID_PASSWORD_TYPE: "Password is not in a valid format",
    INVALID_PASSWORD: "Password does not match.",
  },
  USERNAME: {
    INVALID_USERNAME_TYPE: "Username is not in a valid format",
    TOO_MANY_USERS: "Too many users have this username, please try another",
  },
  AUTH: {
    ACCOUNT_LOCKED: "This account is locked!",
    INVALID_CREDENTIALS: "Email or password is invalid",
  },
  CURRENT_PWD: {
    INVALID_CURRENT_PASSWORD_TYPE: "Current password is not in a valid format",
  },
  NEW_PWD: {
    INVALID_NEW_PASSWORD_TYPE: "New password is not in a valid format",
  },
  CONFIRM_PWD: {
    PWD_NOT_MATCH: "Password do not match!",
  },
};

export type ErrorKey = keyof typeof Errors;
