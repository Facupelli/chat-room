import { type } from "./variables";
import axios from "axios";
import io from "socket.io-client";


export const setCookie = (cookie) => {
  return {
    type: type.SET_COOKIE,
    payload: cookie,
  };
};

export const getUserData = (cookie) => {
  return {
    type: type.GET_USER_DATA,
    payload: cookie,
  };
};

export const getUser = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/user?id=${id}`);

    return dispatch({
      type: type.GET_USER_DATA,
      payload: res.data,
    });
  } catch (e) {
    console.log(e);
  }
};

// ROOOMS--------------------------------------------

export const getRooms = () => async (dispatch) => {
  try {
    const res = await axios.get("/room");

    return dispatch({
      type: type.GET_ALL_ROOMS,
      payload: res.data,
    });
  } catch (e) {
    console.log(e);
  }
};

//SOCKET -----------------------------------------
export const setSocket = () => async (dispatch) => {
  try {
    const newSocket = io(`http://${window.location.hostname}:3001`);

    return dispatch({
      type: type.SET_SOCKET,
      payload: newSocket,
    });
  } catch (e) {
    console.log(e);
  }
};
