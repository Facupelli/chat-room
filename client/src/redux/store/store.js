import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../reducer/reducer';
import thunk from 'redux-thunk';

// creo la store
export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
