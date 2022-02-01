import { type } from "../actions/variables";

const initialState = {
  socket: {},
  cookie: "",
  user: [],
  rooms: [],
  rooms_joined: [],
};

const rootReducer = (state = initialState, action) => {
  const { payload } = action;

  switch (action.type) {
    case type.SET_SOCKET:
      return {
        ...state,
        socket: payload,
      };
    case type.SET_COOKIE:
      return {
        ...state,
        cookie: payload,
      };
    case type.GET_USER_DATA:
      return {
        ...state,
        user: payload,
      };
    case type.GET_ALL_ROOMS:
      return {
        ...state,
        rooms: payload,
      };
    case type.GET_ROOMS_JOINED:
      return{
        ...state,
        rooms_joined: payload[0].roomsJoined,
      }

    default:
      return state;
  }
};

export default rootReducer;
