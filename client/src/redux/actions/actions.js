import { type } from "./variables";
import axios from 'axios'

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

export const getUser =
  (id) => async (dispatch) => {
    try {
      const res = await axios.get(`/user?id=${id}`);

      return dispatch({
        type: type.GET_USER_DATA,
        payload: res.data,
      });
    } catch (e) {
      console.log(e)
    }
  };