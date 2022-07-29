import { Entity } from '@discord/types';
import { AxiosError } from "axios";

interface ErrorObject {
  msg: string;
  param: 'username' | 'email' | 'password';
}

export function searchError(errors: ErrorObject[], param: ErrorObject['param']) {
  if (!errors.length) return undefined;
  const first = errors[0].msg;
 
  if (first === 'Email or password is invalid' 
      || first === 'Email already in use'
      || first === 'This account is locked!')  
    return first;
  
  return errors.find((e) => e.param === param)?.msg;
}

export function generateRandomIntWith(length: number, min = 0) {
  return Math.floor(Math.random() * length + min);
}

export const notInArray = (arr: any[]) => (old: any) => {
  return !arr.some((e) => e.id === old.id);
};

export const token = () => localStorage.getItem('access_token');

export function extractErrorMessage(error: AxiosError) {
  const { response } = error;
  if (!response) return 'Unknown error';
  const { data }: any = response;
  if (!data.message) return 'Unknown error';
  
  if (Array.isArray(data.message))
    return data.message[0];
  
  return data.message;
}

export function getAvatarUrl(from: Entity.User | Entity.Channel) {
  const { avatar } = from;
  return `${process.env.REACT_APP_API_ROOT}/assets/avatars/${avatar ?? 'unknown'}.png`;
}

export function copyToClipboard(content: string) {
  navigator.clipboard.writeText(content);
}
