import { connect } from 'react-redux';
import {createRoute} from '../../actions/route_actions.js';
import {logout} from '../../actions/session_actions.js';
import Map from './map.js';


const mapStateToProps = state => ({
  currentUser: state.session.currentUser
});

const mapDispatchToProps = (dispatch) => ({
  createRoute: route => dispatch(createRoute(route)),
  logout: () => dispatch(logout())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);
