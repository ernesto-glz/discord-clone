import { getJwt } from "./user";

export const getHeaders = () => ({
  Authorization: `Bearer ${getJwt()}`
});
