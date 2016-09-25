import React, { Component } from 'react';
import NavbarContainer from '../navbar/navbar_container.js';
import {
  StyleSheet,
  Picker,
  Text,
  View,
  TouchableHighlight,
  StatusBar,
  Alert,
} from 'react-native';

import MapView, {Polyline} from 'react-native-maps';
import RouteModal from './modal.js';
import StopWatch from '../stopwatch/stopwatch.js';
import Spinner from 'react-native-loading-spinner-overlay';

class Map extends Component {

  constructor(props) {
    super(props);
    this.state = {
      region: null,
      coordinates: [],
      started: false,
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
    };
    this.startMarker = {latitude: 37.782957, longitude: -122.397981};
    this.startWorkout = this.startWorkout.bind(this);
    this.stopWorkout = this.stopWorkout.bind(this);
    this.getDuration = this.getDuration.bind(this);
    this.submitRoute = this.submitRoute.bind(this);
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
    this.setState({visible: true});
    let that = this;
    this.startTime = new Date();
    this.watch = navigator.geolocation.watchPosition(
      (position) => {
        console.log(position.coords.latitude);
        console.log(position.coords.longitude);
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
        }, visible: false, started: true});
      },
      (error) => {console.log(error);},
      {enableHighAccuracy: true, distanceFilter: 5}
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
    this.setState({route: {
      user_id: this.props.currentUser.id,
      distance: null,
      duration: null,
      title: "",
      description: "",
      activity_type: "",
      appcoords: null
    }, coordinates: [], started: false});
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
      const lon1 = coordinates[i].longitude;
      const lat2 = coordinates[i + 1].latitude;
      const lon2 = coordinates[i + 1].longitude;
      kmDistance += this.getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2);
    }
    let mDistance = Math.round((kmDistance * 0.62) * 10)/10;
    let sDistance = `${mDistance} mi`;
    this.state.route.distance = sDistance;
  }

  getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    let R = 6371; // Radius of the earth in km
    let dLat = this.deg2rad(lat2-lat1);  // deg2rad below
    let dLon = this.deg2rad(lon2-lon1);
    let a =
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ;
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    let d = R * c; // Distance in km
    return d;
  }

  deg2rad(deg) {
    return deg * (Math.PI/180);
  }

  render() {
    const startButton = <TouchableHighlight style={styles.touchable} onPress={this.startWorkout}>
      <Text style={styles.text}>Start</Text>
    </TouchableHighlight>;

    const stopButton = <RouteModal stopWorkout={this.stopWorkout} route={this.state.route} coordinates={this.state.coordinates}
      submitRoute={this.submitRoute} />;

    return (
      <View style={styles.container}>
        <Spinner visible={this.state.visible} />
        <StatusBar
          hidden={true}
          />
        <NavbarContainer />
        <MapView style={styles.map}  region={this.state.region}>
          <Polyline coordinates={this.state.coordinates} strokeWidth={5} strokeColor={'#00F'}
            />
          <MapView.Marker
            coordinate={this.startMarker}
            />
        </MapView>
        <StopWatch started={this.state.started} />
        {this.state.started ? stopButton : startButton}
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

export default Map;
