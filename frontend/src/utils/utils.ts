interface ErrorObject {
  msg: string;
  param: 'username' | 'email' | 'password';
}

export function searchError(errors: ErrorObject[], param: ErrorObject['param']) {
  if (!errors.length) return undefined;
  const first = errors[0].msg;
 
  if (first === 'Email or password is invalid' || first === 'Email already in use')
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