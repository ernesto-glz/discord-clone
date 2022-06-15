export const getUserFromStorage = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const setUserInStorage = (payload: any) => {
  localStorage.setItem('user', JSON.stringify(payload));
};

export const removeUserFromStorage = () => {
  localStorage.removeItem('user');
};

export const getUser = () => localStorage.getItem('user');

export const setJwt = (jwt: string) => {
  localStorage.setItem('jwt', jwt);
};

export const getJwt = () => {
  return localStorage.getItem('jwt');
};

export const removeJwt = () => {
  localStorage.removeItem('jwt');
};
