import React, { Component } from 'react';
import Index from './index.js';
import configureStore from './store/store.js';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

class takeuplessApp extends Component {

  render() {

    let store;
    store = configureStore();

    return(
      <Index store={store}/>
    );
  }
}


AppRegistry.registerComponent('takeuplessApp', () => takeuplessApp);
