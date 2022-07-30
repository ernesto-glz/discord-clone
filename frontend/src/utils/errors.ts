export const EmailCodes = {
  INVALID_EMAIL_TYPE: 'Not a well formed email address.',
  ALREADY_USED: 'Email is already registered'
};

export const PasswordCodes = {
  INVALID_PASSWORD_TYPE: 'Password is not in a valid format',
  INVALID_PASSWORD: 'Password does not match.'
};

export const UsernameCodes = {
  INVALID_USERNAME_TYPE: 'Username is not in a valid format',
  TOO_MANY_USERS: 'Too many users have this username, please try another'
};

export const AuthCodes = {
  ACCOUNT_LOCKED: 'This account is locked!',
  INVALID_CREDENTIALS: 'Email or password is invalid'
};

export const CurrentPasswordCodes = {
  INVALID_CURRENT_PASSWORD_TYPE: 'Current password is not in a valid format'
};

export const NewPasswordCodes = {
  INVALID_NEW_PASSWORD_TYPE: 'New password is not in a valid format'
};

export interface ErrorObject {
  message: string;
  code: string;
}

type Key = 'USERNAME' | 'PASSWORD' | 'EMAIL' | 'CURRENT_PWD' | 'NEW_PWD' | 'CONFIRM_PWD';

export function findError(errors: ErrorObject[], param: Key) {
  if (!errors.length) return undefined;

  const emailError = errors.find((e) => {
    return e.code in EmailCodes || e.code in AuthCodes;
  })?.message;
  const passwordError = errors.find((e) => {
    return e.code in PasswordCodes || e.code in AuthCodes;
  })?.message;
  const usernameError = errors.find((e) => {
    return e.code in UsernameCodes || e.code in AuthCodes;
  })?.message;
  const currentPwdError = errors.find((e) => {
    return e.code in CurrentPasswordCodes || e.code in PasswordCodes;
  })?.message;
  const newPwdError = errors.find((e) => {
    return e.code in NewPasswordCodes;
  })?.message;
  const confirmPwdError = errors.find((e) => {
    return e.code === 'PWD_NOT_MATCH';
  })?.message;


  switch (param) {
    case 'EMAIL':
      return emailError;
    case 'PASSWORD':
      return passwordError;
    case 'USERNAME':
      return usernameError;
    case 'CURRENT_PWD':
      return currentPwdError;
    case 'NEW_PWD':
      return newPwdError;
    case 'CONFIRM_PWD':
      return confirmPwdError;
    default:
      return undefined;
  }
}