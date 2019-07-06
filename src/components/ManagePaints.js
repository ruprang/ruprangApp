import React, {Component} from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, Dimensions, ScrollView } from 'react-native';
import {BASEURL} from '../constants/constants';

const windowWidth = Dimensions.get('window').width;

const rresponseJson = [
  {
      "paint": "royale",
      "price": 1200,
      "description": "lorem ipsum lorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsum"
  },
  {
      "paint": "narolac",
      "price": 9000,
      "description": "lorem ipsum lorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsum"
  },
  {
      "paint": "duplicate",
      "price": 100,
      "description": "lorem ipsum lorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsum"
  },
  {
      "paint": "kiuy",
      "price": 677,
      "description": "lorem ipsum lorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsum"
  },
  {
      "paint": "Luster",
      "price": 789,
      "description": "lorem ipsum lorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsum"
  },
  {
      "paint": "kunalPaint",
      "price": 1,
      "description": "lorem ipsum lorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsum"
  }
];

export default class ManagePaints extends Component{
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
    fetch(`${BASEURL}get_price`,{
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
    fetch(`${BASEURL}del_paint/${username}`,{
      method: 'POST'
    })
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({isLoading: false, isError: false, allUsers:responseJson});
      alert('Paint deleted successfully');
    })
    .catch((error) => {
      this.setState({isLoading: false, isError: true});
    });

  }

  renderUsers(){
    return this.state.allUsers.map((user, index) => {
      return (
        <View style={styles.userTile}>
        <View>
          <Text style={styles.username}>{user.paint}   Rs. {user.price}</Text>
          <TouchableOpacity
          style={styles.delete}
          onPress={() => {this.deleteUser(user.paint)}}>
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
        <View style={{marginTop:15}}>
        <Text style={styles.username}>{user.desc}</Text>
        </View>
        </View>
      )
    })
  }

  addUserClick(){
    this.props.navigation.navigate('AddPaint');
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
                <Text style={styles.buttonText}>Add new paint</Text>
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
    flexDirection:'column',
    backgroundColor:'gray',
    width: windowWidth-20,
    margin: 10,
    padding: 10
  },
  userTileFirstLine:{
    flexDirection:'row'
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
