import React, {Component} from 'react';
import {View, Text, TextInput, StyleSheet, Image, AsyncStorage} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Button from 'react-native-button';

class Navbar extends Component {

  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout(e) {
    e.preventDefault();
    this.props.logout();
    AsyncStorage.multiRemove(['username', 'password']);
    Actions.loginScreen();
  }

  render() {
    return(
      <View style={styles.container}>
        <Image style = {styles.logo}
        source={{uri: 'http://res.cloudinary.com/dj6gqauyi/image/upload/v1473357234/logo_ucucfj.png'}} />
        <View style={styles.rightContent}>
          <Button onPress={this.logout} style={styles.button}>Logout</Button>
          {this.props.loggedIn ? <Image style={styles.profile}
          source={{uri: this.props.currentUser.profile_picture}} /> : null}
        </View>
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
  },
  button: {
    color: '#fff',
    marginTop: 13,
    marginRight: 5,
  }
});

export default Navbar;
