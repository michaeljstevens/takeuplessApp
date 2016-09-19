import React, { Component } from 'react';
import Map from './components/map.js';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

class takeuplessApp extends Component {
  render() {
    return(
      <Map />
    );
  }
}


AppRegistry.registerComponent('takeuplessApp', () => takeuplessApp);
