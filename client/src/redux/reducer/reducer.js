import { type } from "../actions/variables";

const initialState = {
  user: [],
  cookie: "",
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
    default:
      return state;
  }
};

export default rootReducer;
