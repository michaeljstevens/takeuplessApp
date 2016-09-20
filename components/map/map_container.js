import { connect } from 'react-redux';
import Map from './map.js';


const mapStateToProps = state => ({
  // currentUser: state.session.currentUser
  test: "test"
});

const mapDispatchToProps = (dispatch) => ({
  // createRoute: route => dispatch(createRoute(route))
});

export default connect(
  mapStateToProps,
  null
)(Map);
