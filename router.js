import React, { Component } from 'react';
import { Router, Scene, Actions } from 'react-native-router-flux';
import MapContainer from './components/map/map_container.js';
import SessionFormContainer from './components/session/session_form_container.js';
import App from './app.js';


class AppRouter extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router hideNavBar={true}>
        <Scene key="root">
          <Scene key="loginScreen" component={SessionFormContainer}
            initial={true} />
          <Scene key="mapScreen" component={MapContainer} />
        </Scene>
      </Router>
    );
  }
}

AppRouter.contextTypes = {
  store: React.PropTypes.object.isRequired
};

export default AppRouter;
