import React, {Component} from 'react';
import {View, Text, TextInput, StyleSheet, Image, AsyncStorage} from 'react-native';
import Button from 'react-native-button';
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
    const loginButton = <Button onPress={this.handleSubmit} style={styles.button}>Login</Button>;
    const logoutButton = <Button onPress={this.logout} style={styles.button}>Logout</Button>;
    return(
      <View style={styles.container}>
        {this.props.currentUser ? <Image style={{width: 50, height: 50}}
        source={{uri: this.props.currentUser.profile_picture}} /> : null }
        <TextInput onChangeText={this.updateState("username")} style={styles.input} />
        <TextInput onChangeText={this.updateState("password")} secureTextEntry={true} style={styles.input} />
        {this.props.currentUser ? logoutButton : loginButton}
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  input: {
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
    color: '#fff',
    width: 200,
    textAlign: 'center'
  },
  button: {
    fontSize: 20,
    color: 'green'
  }
});

export default SessionForm;
