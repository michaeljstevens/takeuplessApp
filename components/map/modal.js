import React, {Component} from 'react';
import { Modal, Text, TouchableHighlight, View, TextInput, StyleSheet, Picker } from 'react-native';
import Dropdown, {Select, Option, OptionList} from 'react-native-selectme';
import {Actions} from 'react-native-router-flux';

class RouteModal extends Component {


  constructor(props) {
    super(props);
    this.state = {modalVisible: false, activity_type: "WALKING", title: "", description: ""};
    this.submit = this.submit.bind(this);
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  _getOptionList() {
    return this.refs['OPTIONLIST'];
  }

  submit() {
    this.props.submitRoute(this.state);
  }


  updateState(field){
    return e => {
       this.setState({[field]: e});
     };
  }

  render() {
    return(
      <View style={styles.container2}>
        <Modal
          animationType={"none"}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setModalVisible(!this.state.modalVisible);
          }}
          >
         <View style={styles.container}>
            <View>
              <Text style={styles.text}>Title</Text>
              <TextInput onChangeText={this.updateState("title")} style={styles.input} />
            </View>

            <View>
              <Text style={styles.text}>Description</Text>
              <TextInput onChangeText={this.updateState("description")} style={[styles.input, {height: 100}]}/>
            </View>

            <Picker
              selectedValue={this.state.activity_type}
              onValueChange={this.updateState("activity_type")}
              style={styles.picker}
              itemStyle={{color:'#FFF', fontSize:30}}>
              <Picker.Item label="Walk" value="WALKING" />
              <Picker.Item label="Run" value="RUNNING" />
              <Picker.Item label="Bike" value="BICYCLING" />
            </Picker>
            <TouchableHighlight onPress={() => {
              this.setModalVisible(!this.state.modalVisible);
              this.submit();
            }}>
              <Text style={styles.submit}>Submit</Text>
            </TouchableHighlight>
         </View>
        </Modal>

        <TouchableHighlight style={styles.touchable} onPress={() => {
          this.setModalVisible(true);
          this.props.stopWorkout();
        }}>
          <Text style={styles.button}>Stop</Text>
        </TouchableHighlight>

      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    backgroundColor: 'black',
    position: 'relative',
    padding: 50,
  },
  picker: {
    backgroundColor: '#000',
    width: 125,
  },
  text: {
    fontSize: 25,
    color: "#FFF",
  },
  submit: {
    fontSize: 25,
    color: "#FFF",
    borderWidth: 1,
    borderColor: "#FFF",
    width: 150,
    padding: 5,
    borderRadius: 5,
    textAlign: 'center',
  },
  container2: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#000',
    padding: 5,
    borderRadius: 5,
  },
  button: {
    color: '#FFF',
    fontSize: 45,
  },
  input: {
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
    color: '#fff',
    width: 250,
    textAlign: 'center',
    margin: 5,
  },
});


export default RouteModal;
