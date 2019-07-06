import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, BackHandler } from 'react-native';

export default class MainAdmin extends Component{
  constructor(props){
    super(props);
    this.handleBackButton = this.handleBackButton.bind(this);
  }

  componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

  componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton() {
    return true;
  }

  render(){
    return(
      <View style={styles.wrapper}>
        <TouchableOpacity onPress={() => {this.props.navigation.navigate('ChangePassword',{username:this.props.navigation.state.params.username})}} style={styles.buttonStyle}>
            <Text style={styles.buttonText}>Change password</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {this.props.navigation.navigate('ManageUsers')}} style={styles.buttonStyle}>
            <Text style={styles.buttonText}>Manage users</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {this.props.navigation.navigate('ManagePaints')}} style={styles.buttonStyle}>
            <Text style={styles.buttonText}>Manage paints</Text>
        </TouchableOpacity>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonStyle:{
    padding: 10,
    backgroundColor: 'blue',
    margin:5
  },
  buttonText:{
    color:'white',
    fontWeight:'bold',
    fontSize:15
  }
});
