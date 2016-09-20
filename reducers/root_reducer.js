import { combineReducers } from 'redux';
import SessionReducer from '../reducers/session_reducer.js';
import ErrorReducer from '../reducers/error_reducer.js';

const RootReducer = combineReducers({
  session: SessionReducer,
  errors: ErrorReducer
});

export default RootReducer;
