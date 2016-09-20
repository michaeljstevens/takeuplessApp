import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';
import MapContainer from './components/map/map_container.js';
import SessionFormContainer from './components/session/session_form_container.js';


export default class App extends Component {
  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene key="sessionFormContainer" component={MapContainer} title="SessionFormContainer" initial={true} />
        </Scene>
      </Router>
    );
  }
}
