import { type } from "../actions/variables";

const initialState = {
  user: [],
  cookie: "",
};

const rootReducer = (state = initialState, action) => {
  const { payload } = action;

  switch (action.type) {
    //usar importacion type que incluye las constantes para facilitarte,agregar constantes si es necesario en variables.js ""

    case type.GET_SERVICES:
      return {
        ...state,
        services: payload,
        endPage: payload && payload.length === 0 ? true : false,
      };
    default:
      return state;
  }
};

export default rootReducer;
