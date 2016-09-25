import React, {Component} from 'react';
import {View, Text, TextInput, StyleSheet,
  Image, AsyncStorage, StatusBar, TouchableHighlight, Alert} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Spinner from 'react-native-loading-spinner-overlay';

class SessionForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      visible: false,
    };
    this.updateState = this.updateState.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.startDemo = this.startDemo.bind(this);
  }

  componentWillMount() {
    AsyncStorage.multiGet(['username', 'password']).then((data) => {
      if(data[0][1] && data[1][1]) {
        this.state.username = data[0][1];
        this.state.password = data[1][1];
        this.props.login(this.state);
        this.setState({visible: true, username: "", password: ""});
      }
    });
  }

  componentWillReceiveProps(newProps) {
    console.log(this.state.username);
    console.log(this.state.password);
    console.log(newProps);
    if (newProps.currentUser && !(newProps.currentUser[0])) {
      AsyncStorage.multiGet(['username', 'password']).then((data) => {
        if (!data[0][1] && !data[1][1]) {
          AsyncStorage.multiSet([
      			['username', this.state.username],
      			['password', this.state.password]
      		]);
        }
      });
      Actions.mapScreen({type: 'reset'});
    } else if (newProps.currentUser && newProps.currentUser[0]) {
      this.setState({username: "", password: ""});
      Alert.alert('', "Username and Password Mismatch");
    }

    this.setState({visible: false});
  }

  updateState(field){
		return e => {
       this.setState({[field]: e});
     };
	}

  handleSubmit(e) {
    e.preventDefault();
    const user = this.state;
    delete user.visible;
    console.log(user);
    this.props.login(user);
    this.setState({visible: true});
  }

  startDemo(e) {
    e.preventDefault();
    this.state.username = "Jeff Goldblum";
    this.state.password = "password";
    const user = this.state;
    delete user.state;
    this.props.login(user);
    this.setState({visible: true});
  }

  render() {
    return(
      <View style={styles.container}>
        <Spinner visible={this.state.visible} />
        <StatusBar
          barStyle='light-content'
          />

        <Image style = {styles.logo}
        source={{uri: 'http://res.cloudinary.com/dj6gqauyi/image/upload/v1473357234/logo_ucucfj.png'}} />

        <View style={{padding: 5}}>
          <Text style={styles.text}>Username</Text>
          <TextInput value={this.state.username} onChangeText={this.updateState("username")} style={styles.input} />
        </View>

        <View style={{padding: 5}}>
          <Text style={styles.text}>Password</Text>
          <TextInput value={this.state.password} onChangeText={this.updateState("password")} secureTextEntry={true} style={styles.input} />
          <View style={{flex: 1, flexDirection: 'row'}}>
            <TouchableHighlight style={styles.touchable} onPress={this.handleSubmit}>
              <Text style={[styles.text, {borderWidth: 1, borderColor: 'white', padding: 5,
                borderRadius: 5, width: 75, marginTop: 20, marginLeft: 0, textAlign: 'center'}]}>Login</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.touchable} onPress={this.startDemo}>
              <Text style={[styles.text, {borderWidth: 1, borderColor: 'white', padding: 5,
              borderRadius: 5, width: 80, marginTop: 20, marginLeft: 45, textAlign: 'center'}]}>Demo</Text>
            </TouchableHighlight>
          </View>
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
