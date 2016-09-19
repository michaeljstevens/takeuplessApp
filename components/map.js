import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import MapView from 'react-native-maps';
class Map extends Component {

  constructor(props) {
    super(props);
    this.state = {
      position: null
    };
  }


  render() {

    // setInterval(()=> {
    //   navigator.geolocation.getCurrentPosition(
    //     (position) => {
    //       this.setState({position: position});
    //     },(error) => alert(error),
    //     {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    //   );
    // }, 5000);


    return (
      <View style={styles.container}>
        <Text style={styles.text}>{this.state.position ? this.state.position.coords.longitude : "Nothing to show"}</Text>
        <MapView style={styles.map} region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  map: {
   position: 'absolute',
   top: 100,
   left: 0,
   right: 0,
   bottom: 0,
 },
 text: {
   position: 'absolute',
   top: 50,
 }
});

export default Map;
