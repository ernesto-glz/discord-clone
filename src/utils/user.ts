export const getUserFromLocalStorage = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const setUserInLocalStorage = (payload: any) => {
  localStorage.setItem('user', JSON.stringify(payload));
};

export const removeUserFromLocalStorage = () => {
  localStorage.removeItem('user');
};

export const getUser = () => localStorage.getItem('user');

export const getJwt = () => {
  const user = getUser();
  if (user) {
    return JSON.parse(user).token;
  }
  return false;
};

export const getUserId = () => {
  const user = getUser();
  if (user) {
    return JSON.parse(user).id;
  }
  return false;
};
