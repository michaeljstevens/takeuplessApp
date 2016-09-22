import { combineReducers } from 'redux';
import SessionReducer from '../reducers/session_reducer.js';
import RouteReducer from '../reducers/route_reducer.js';
import ErrorReducer from '../reducers/error_reducer.js';

const RootReducer = combineReducers({
  session: SessionReducer,
  route: RouteReducer,
  errors: ErrorReducer
});

export default RootReducer;
