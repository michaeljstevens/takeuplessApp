import React, {Component} from 'react';
import NavbarContainer from './components/navbar/navbar_container.js';
import {View} from 'react-native';
import { Link } from 'react-native-router-flux';


class App extends Component {

  render () {
    return(
      <View>
        <View>
          <NavbarContainer />
        </View>
      </View>
    );
  }
}

export default App;
