import { applyMiddleware } from 'redux';
import SessionMiddleware from '../middleware/session_middleware.js';
import RouteMiddleware from '../middleware/route_middleware.js';

const RootMiddleware = applyMiddleware(
  SessionMiddleware,
  RouteMiddleware
);

export default RootMiddleware;
