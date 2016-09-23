import { connect } from 'react-redux';
import SessionForm from './session_form';
import { login, logout } from '../../actions/session_actions';


const mapStateToProps = state => {
  return ({
    loggedIn: !!state.session.currentUser,
    currentUser: state.session.currentUser,
    errors: state.errors,
  });
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    login: user => dispatch(login(user)),
    logout: () => dispatch(logout())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionForm);
