import React, {Component} from 'react';
import {View, Text, TextInput, StyleSheet, Image, AsyncStorage, TouchableHighlight} from 'react-native';
import {Actions} from 'react-native-router-flux';

class Navbar extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return(
      <View style={styles.container}>
        <Image style = {styles.logo}
        source={{uri: 'http://res.cloudinary.com/dj6gqauyi/image/upload/v1473357234/logo_ucucfj.png'}} />
        <TouchableHighlight onPress={this.props.showMenu}>
          <View style={styles.rightContent}>
              <Text style={styles.name}>{this.props.currentUser.username}</Text>
            {this.props.loggedIn ? <Image style={styles.profile}
            source={{uri: this.props.currentUser.profile_picture}} /> : null}
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 60,
    flexDirection: 'row',
    backgroundColor: 'black',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  rightContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  profile: {
    width: 55,
    height: 55,
    backgroundColor: 'black',
    borderRadius: 28,
    marginTop: 1,
    marginRight: 4,
  },
  logo: {
    width: 200,
    height: 40,
    marginLeft: 5,
  },
  name: {
    color: '#fff',
    fontSize: 15,
    marginTop: 10,
    textAlign: 'right',
    marginRight: 7,
    width: 75,
  }
});

export default Navbar;
