import { SessionConstants, receiveCurrentUser } from '../actions/session_actions';
import { login, logout } from '../util/session_api_util';
import { receiveErrors } from '../actions/error_actions.js';

export default ({getState, dispatch}) => next => action => {
  const success = user => dispatch(receiveCurrentUser(user));
  const error = xhr => {
    const errors = xhr.responseJSON;
    dispatch(receiveErrors(errors));
  };
  switch(action.type){
    case SessionConstants.LOGIN:
      login(action.user, success, error);
      return next(action);
    case SessionConstants.LOGOUT:
      const logoutSuccess = () => console.log("success");
      logout(logoutSuccess);
      return next(action);
    default:
      return next(action);
  }
};
