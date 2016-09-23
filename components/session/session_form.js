import React, {Component} from 'react';
import {View, Text, TextInput, StyleSheet,
  Image, AsyncStorage, StatusBar, TouchableHighlight} from 'react-native';
import {Actions} from 'react-native-router-flux';

class SessionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
    this.updateState = this.updateState.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentWillMount() {
    AsyncStorage.multiGet(['username', 'password']).then((data) => {
      if(data[0][1] && data[1][1]) {
        this.state.username = data[0][1];
        this.state.password = data[1][1];
        this.props.login(this.state);
        this.setState({username: "", password: ""});
      }
    });
  }

  componentWillReceiveProps(newProps) {
    if (!this.props.currentUser && newProps.currentUser) {
      AsyncStorage.multiGet(['username', 'password']).then((data) => {
        if (!data[0][1] && !data[1][1]) {
          AsyncStorage.multiSet([
      			['username', this.state.username],
      			['password', this.state.password]
      		]);
        }
      });
      Actions.mapScreen();
    }
  }

  updateState(field){
		return e => {
       this.setState({[field]: e});
     };
	}

  handleSubmit(e) {
    e.preventDefault();
    const user = this.state;
    this.props.login(user);
  }

  logout(e) {
    e.preventDefault();
    this.props.logout();
    AsyncStorage.multiRemove(['username', 'password']);
  }

  render() {

    return(
      <View style={styles.container}>
        <StatusBar
          barStyle='light-content'
          />

        <Image style = {styles.logo}
        source={{uri: 'http://res.cloudinary.com/dj6gqauyi/image/upload/v1473357234/logo_ucucfj.png'}} />

        <View style={{padding: 5}}>
          <Text style={styles.text}>Username</Text>
          <TextInput onChangeText={this.updateState("username")} style={styles.input} />
        </View>

        <View style={{padding: 5}}>
          <Text style={styles.text}>Password</Text>
          <TextInput onChangeText={this.updateState("password")} secureTextEntry={true} style={styles.input} />
          <TouchableHighlight style={styles.touchable} onPress={this.handleSubmit}>
            <Text style={[styles.text, {borderWidth: 1, borderColor: 'white', padding: 5,
            borderRadius: 5, width: 75, marginTop: 20, marginLeft: 125, textAlign: 'center'}]}>Login</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'black',
    paddingTop: 50,
  },
  text: {
    fontSize: 25,
    color: 'white',
  },
  logo: {
    width: 300,
    height: 75,
    marginBottom: 50,
  },
  input: {
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
    color: '#fff',
    width: 200,
    textAlign: 'center'
  },
});

export default SessionForm;
