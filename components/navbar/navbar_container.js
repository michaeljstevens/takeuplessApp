import { connect } from 'react-redux';
import Navbar from './navbar';
import {logout} from '../../actions/session_actions.js';


const mapStateToProps = state => {
  return ({
    loggedIn: !!state.session.currentUser,
    currentUser: state.session.currentUser
  });
};

const mapDispatchToProps = dispatch => {
  return ({
    logout: () => dispatch(logout())
  });
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
