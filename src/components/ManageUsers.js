import React, {Component} from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, Dimensions, ScrollView } from 'react-native';
import {BASEURL} from '../constants/constants';

const windowWidth = Dimensions.get('window').width;

const rresponseJson = [
    {
        "role": "user",
        "username": "root"
    },
    {
        "role": "user",
        "username": "put"
    },
    {
        "role": "user",
        "username": "ho"
    },
    {
        "role": "user",
        "username": "asfd"
    },
    {
        "role": "user",
        "username": "sasd"
    },
    {
        "role": "user",
        "username": "ofa"
    },
    {
        "role": "user",
        "username": "ramu"
    },
    {
        "role": "user",
        "username": "pushpa"
    },
    {
        "role": "user",
        "username": "nikhil"
    },
    {
        "role": "admin",
        "username": "admin"
    },
    {
        "role": "user",
        "username": "sallu"
    }
];

export default class ManageUsers extends Component{
  constructor(props){
    super(props);
    this.state={
      allUsers: [],
      isLoading: true,
      isError: false
    };
    this.renderUsers = this.renderUsers.bind(this);
  }

  componentDidMount(){
    fetch(`${BASEURL}show_users`,{
      method: 'GET'
    })
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({isLoading: false, isError: false, allUsers:responseJson});
    })
    .catch((error) => {
      this.setState({isLoading: false, isError: true});
    });
  }

  deleteUser(username){
    this.setState({isLoading: true});
    fetch(`${BASEURL}del_user/${username}`,{
      method: 'POST'
    })
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({isLoading: false, isError: false, allUsers:responseJson});
      alert('User deleted successfully');
    })
    .catch((error) => {
      this.setState({isLoading: false, isError: true});
    });

  }

  renderUsers(){
    return this.state.allUsers.map((user, index) => {
      return (
        <View style={styles.userTile}>
          <Text style={styles.username}>{user.username}</Text>
          <TouchableOpacity
          style={styles.delete}
          onPress={() => {this.deleteUser(user.username)}}>
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      )
    })
  }

  addUserClick(){
    this.props.navigation.navigate('AddUser');
  }

  render(){
    return(
      <ScrollView style={(this.state.isLoading || this.state.isError ) ? styles.wrapper : styles.wrapperTiles}>
        {this.state.isLoading ?
            <ActivityIndicator size="large"/> :
          ((this.state.isError) ?
              <Text>An error occurred. Please try again later.</Text> :
              <View>
              {this.renderUsers()}
              <TouchableOpacity
              style={styles.deleteGreen}
              onPress={() => {this.addUserClick()}}>
                <Text style={styles.buttonText}>Add new user</Text>
              </TouchableOpacity>
              </View>
        )}
        </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  wrapperTiles:{
    flex: 1,
  },
  userTile:{
    flexDirection:'row',
    backgroundColor:'gray',
    width: windowWidth-20,
    margin: 10,
    padding: 10
  },
  username:{
    color:'white',
    fontWeight: 'bold',
    fontSize: 17
  },
  delete:{
    borderWidth:1,
    borderColor:'gray',
    borderRadius:5,
    padding:5,
    backgroundColor:'red',
    right: 10,
    top: 5,
    position: 'absolute'
  },
  deleteGreen:{
    borderWidth:1,
    borderColor:'gray',
    borderRadius:5,
    padding:5,
    backgroundColor:'green',
    margin: 10,
    width: 120
  },
  buttonText:{
    color:'white',
    fontWeight: 'bold',
    fontSize: 17
  },
});
