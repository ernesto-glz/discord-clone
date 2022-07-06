export const setJwt = (jwt: string) => {
  localStorage.setItem('jwt', jwt);
};

export const getJwt = () => {
  return localStorage.getItem('jwt');
};

export const removeJwt = () => {
  localStorage.removeItem('jwt');
};