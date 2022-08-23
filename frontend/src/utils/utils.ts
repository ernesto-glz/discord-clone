import { Entity } from '@discord/types';
import { AxiosError } from 'axios';

export function generateRandomIntWith(length: number, min = 0) {
  return Math.floor(Math.random() * length + min);
}

export const notInArray = (arr: any[]) => (old: any) => {
  return !arr.some((e) => e.id === old.id);
};

export const notRepeated = (arr: any[], element: any) => {
  const alreadyExists = arr.find((e) => e.id === element.id);
  if (alreadyExists)
    return arr;
  return [...arr, element];
}

export const token = () => localStorage.getItem('access_token');

export function extractErrorMessage(error: AxiosError) {
  const { response } = error;
  if (!response) return 'Unknown error';
  const { data }: any = response;
  if (!data.message) return 'Unknown error';

  if (Array.isArray(data.message)) return data.message[0];

  return data.message;
}

export function getAvatarUrl(from: Entity.User | Entity.Channel) {
  const { avatar } = from;
  if (!avatar) return `${globalEnv.API_ROOT}/assets/avatars/unknown.png`;
  if (avatar.startsWith('/')) return `${globalEnv.API_ROOT}/assets${avatar}`;
  return `${globalEnv.API_ROOT}/assets/avatars/${avatar}.png`;
}

export function copyToClipboard(content: string) {
  navigator.clipboard.writeText(content);
}

export function moveToStart(elements: string[], elementId: string) {
  const elms = [...elements];
  const index = elms.indexOf(elementId);
  elms.splice(index, 1);
  elms.unshift(...[elementId]);
  return elms;
}

export function readFile(file: any) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => resolve(reader.result), false);
    reader.readAsDataURL(file);
  });
}

