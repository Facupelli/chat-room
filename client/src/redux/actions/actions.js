import { type } from "./variables";

export const setCookie = (cookie) => {
    return {
      type: type.SET_COOKIE,
      payload: cookie,
    };
  };

export const getUserData = (cookie) => {
  return{ 
    type: type.GET_USER_DATA,
    payload: cookie
  }
} 