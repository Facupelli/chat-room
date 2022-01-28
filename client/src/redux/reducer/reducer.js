import { type } from "../actions/variables";

const initialState = {
  cookie: "",
  user: [],
  rooms: [],
};

const rootReducer = (state = initialState, action) => {
  const { payload } = action;

  switch (action.type) {
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

    default:
      return state;
  }
};

export default rootReducer;
