import React, { Component } from 'react';
import NavbarContainer from '../navbar/navbar_container.js';
import {
  StyleSheet,
  AsyncStorage,
  Picker,
  Text,
  View,
  TouchableHighlight,
  StatusBar,
  Alert,
} from 'react-native';

import MapView, {Polyline} from 'react-native-maps';
import RouteModal from './modal.js';
import Spinner from 'react-native-loading-spinner-overlay';
import {Actions} from 'react-native-router-flux';
import {Stopwatch} from 'react-native-stopwatch-timer';

class Map extends Component {

  constructor(props) {
    super(props);
    this.state = {
      region: null,
      coordinates: [],
      started: false,
      reset: false,
      route: {
        user_id: this.props.currentUser.id,
        distance: null,
        duration: null,
        title: "",
        description: "",
        activity_type: "",
        appcoords: null
      },
      visible: false,
      showMenu: false,
    };
    this.startMarker = {latitude: 37.782957, longitude: -122.397981};
    this.startWorkout = this.startWorkout.bind(this);
    this.stopWorkout = this.stopWorkout.bind(this);
    this.getDuration = this.getDuration.bind(this);
    this.submitRoute = this.submitRoute.bind(this);
    this.showMenu = this.showMenu.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentWillMount() {
    navigator.geolocation.getCurrentPosition(
     (position) => {
       console.log(position);
       const lat = position.coords.latitude;
       const lng = position.coords.longitude;
       this.startMarker = {latitude: lat, longitude: lng};
       this.setState({region: {
         latitude: lat,
         longitude: lng,
         latitudeDelta: 0.00922,
         longitudeDelta: 0.00421,
       }});
     },
     (error) => {
       console.log(error);
     },
     {enableHighAccuracy: true, timeout: 5000}
   );
  }

  startWorkout() {
    let firstRender = true;
    this.setState({visible: true});
    let that = this;
    this.startTime = new Date();
    this.watch = navigator.geolocation.watchPosition(
      (position) => {

        if(firstRender) {
          this.setState({started: true, reset: false});
          firstRender = false;
        }

        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const newCoords = Array.from(that.state.coordinates);
        const toAdd = {latitude: lat, longitude: lng};
        if(!newCoords.includes(toAdd)) {
          newCoords.push(toAdd);
        }
        that.setState({coordinates: newCoords, region: {
          latitude: lat,
          longitude: lng,
          latitudeDelta: 0.00922,
          longitudeDelta: 0.00421
        }, visible: false});
      },
      (error) => {console.log(error);},
      {enableHighAccuracy: true, distanceFilter: 1}
    );
  }

  stopWorkout() {
    this.stopTime = new Date();
    navigator.geolocation.clearWatch(this.watch);
  }

  submitRoute(modalState) {
    this.getDistance();
    this.getDuration();
    let route = this.state.route;
    let routeCoords = [];
    this.state.coordinates.forEach(coord => {
      routeCoords.push({'lat': coord.latitude, 'lng': coord.longitude});
    });
    route.appcoords = routeCoords;
    route.title = modalState.title;
    route.description = modalState.description;
    route.activity_type = modalState.activity_type;
    this.props.createRoute(route);
    this.setState({started: false, reset: true, route: {
      user_id: this.props.currentUser.id,
      distance: null,
      duration: null,
      title: "",
      description: "",
      activity_type: "",
      appcoords: null
    }, coordinates: []});
    Alert.alert('', "Route Created Successfully");
  }

  getDuration() {
    let m = Math.round((this.stopTime - this.startTime) / 1000 / 60);
    let sM = `${m} mins`;
    this.state.route.duration = sM;
  }

  getDistance() {
    let coordinates = this.state.coordinates;
    let kmDistance = 0;
    for (let i = 0; i < coordinates.length - 1; i++) {
      const lat1 = coordinates[i].latitude;
      const lng1 = coordinates[i].longitude;
      const lat2 = coordinates[i + 1].latitude;
      const lng2 = coordinates[i + 1].longitude;
      kmDistance += this.calcCoords(lat1, lng1, lat2, lng2);
    }
    let mDistance = Math.round((kmDistance * 0.62) * 10)/10;
    let sDistance = `${mDistance} mi`;
    this.state.route.distance = sDistance;
  }

  calcCoords(lat1,lng1,lat2,lng2) {
    let earthRadius = 6371;
    let lat = this.rad(lat2-lat1);
    let lng = this.rad(lng2-lng1);
    let a =
      Math.sin(lat/2) * Math.sin(lat/2) +
      Math.cos(this.rad(lat1)) * Math.cos(this.rad(lat2)) *
      Math.sin(lng/2) * Math.sin(lng/2)
      ;
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    let d = earthRadius * c;
    return d;
  }

  rad(deg) {
    return deg * (Math.PI/180);
  }

  showMenu() {
    if (this.state.showMenu) {
      this.setState({showMenu: false});
    } else {
      this.setState({showMenu: true});
    }
  }

  logout(e) {
    e.preventDefault();
    this.props.logout();
    AsyncStorage.multiRemove(['username', 'password']);
    Actions.loginScreen({type: 'reset'});
  }

  render() {
    const startButton = <TouchableHighlight style={styles.touchable} onPress={this.startWorkout}>
      <Text style={styles.text}>Start</Text>
    </TouchableHighlight>;

    const menu = (<View style={styles.menuContainer}>
      <TouchableHighlight onPress={this.logout}>
        <Text style={styles.menuText}>Logout</Text>
      </TouchableHighlight>
      <TouchableHighlight onPress={this.showMenu}>
        <Text style={styles.menuText}>Return</Text>
      </TouchableHighlight>
    </View>);

    const stopButton = <RouteModal stopWorkout={this.stopWorkout} route={this.state.route} coordinates={this.state.coordinates}
      submitRoute={this.submitRoute} />;

    return (
      <View style={styles.container}>
        <Spinner visible={this.state.visible} />
        <StatusBar
          hidden={true}
          />
        <NavbarContainer showMenu={this.showMenu}/>
        <MapView style={styles.map}  region={this.state.region}>
          <Polyline coordinates={this.state.coordinates} strokeWidth={5} strokeColor={'#00F'}
            />
          <MapView.Marker
            coordinate={this.startMarker}
            />
        </MapView>
        <Stopwatch start={this.state.started} reset={this.state.reset} options={stopwatchStyles} />
        {this.state.started ? stopButton : startButton}
        {this.state.showMenu ? menu : null }
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#000',
  },

  menuContainer: {
    position: 'absolute',
    top: 60,
    right: 15,
    backgroundColor: '#FFF',
    borderRadius: 5,
    zIndex: 1001,
    flex: 1,
    justifyContent: 'center',
    borderWidth: 1,
    width: 115,
  },
  menuText: {
    fontSize: 30,
    color: "#000",
    padding: 5,
  },
  map: {
   position: 'absolute',
   top: 60,
   left: 0,
   right: 0,
   bottom: 0,
 },
 text: {
   fontSize: 45,
   color: "#FFF",
 },
 touchable: {
   position: 'absolute',
   bottom: 20,
   right: 20,
   backgroundColor: '#000',
   padding: 5,
   borderRadius: 5,
 },
});

const stopwatchStyles = {
  container: {
    position: 'absolute',
    backgroundColor: '#000',
    top: 80,
    left: 20,
    padding: 5,
    borderRadius: 5,
    width: 150,
  },
  text: {
    fontSize: 30,
    color: '#FFF',
    marginLeft: 7,
  }
};



export default Map;
