import ShortUniqueId from 'short-unique-id';

export const generateShortId = () => {
  const uniqueId = new ShortUniqueId({
    length: 4,
    dictionary: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
  });
  return uniqueId();
};

export const catchError = async (call: () => any) => {
  try {
    await call();
    await Promise.reject(Error('Failed'));
  } catch (error: any) {
    return error;
  }
};
