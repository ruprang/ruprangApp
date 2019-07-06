import React, {useState} from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import {BASEURL} from '../constants/constants';

export default function Login(props){
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const showMessage = () => {
    setError(true);
    setTimeout(() => {
      setError(false);
    },5000);
  }

  const onLoginPress = () => {
    //props.navigation.navigate('Main');
    setLoading(true);
    fetch(`${BASEURL}login?username=${username}&password=${password}`,{
      method: 'POST',
      body: null
    })
    .then((response) => response.json())
    .then((responseJson) => {
      setLoading(false);
      if(responseJson.success){
        if(responseJson.role === 'admin'){
          props.navigation.navigate('MainAdmin',{username:username});
        }else{
          props.navigation.navigate('Main',{username:username});
        }
      }else{
        showMessage();
      }
    })
    .catch((error) => {
      setLoading(false);
      showMessage();
    });
  }

  return(
    <View style={styles.wrapper}>
      <Text style={styles.title}>Ruprang Login</Text>
      <View style={styles.inputsParent}>
        <Text style={styles.label}>Username</Text>
        <View style={[styles.textInputWrapper, {paddingRight:20}]}>
          <TextInput
          value={username}
          onChangeText={(text) => {setUsername(text)}}
          style={styles.inputStyles}
          placeholder='Enter Username'/>
        </View>
      </View>
      <View style={styles.inputsParent}>
        <Text style={styles.label}>Password</Text>
        <View style={styles.textInputWrapper}>
          <TextInput
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => {setPassword(text)}}
          style={styles.inputStyles}
          placeholder='Enter Password'/>
        </View>
      </View>
      <TouchableOpacity onPress={() => {onLoginPress()}} style={styles.buttonStyle}>
          { !isLoading ? <Text style={styles.buttonText}>Login</Text> : <View style={styles.loaderWrapper}><ActivityIndicator size="small"/></View>}
      </TouchableOpacity>
      {isError ? <View style={styles.errorWrapper}>
        <Text style={styles.errorText}>An error occurred. Please try again later.</Text>
      </View> : null}
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputsParent:{
    flexDirection: 'row',
    alignItems: 'center',
    marginTop:10,
    marginBottom:10
  },
  buttonStyle:{
    padding: 10,
    backgroundColor: 'blue'
  },
  inputStyles:{
    padding: 10
  },
  textInputWrapper:{
    borderWidth: 1,
    borderColor: 'gray',
    marginLeft:10
  },
  title:{
    color:'black',
    fontWeight:'bold',
    fontSize:20
  },
  label:{
    color:'black',
    fontSize:15
  },
  buttonText:{
    color:'white',
    fontWeight:'bold',
    fontSize:15
  },
  errorText:{
    color: 'red'
  },
  errorWrapper:{
    marginTop: 10
  },
  loaderWrapper:{
    paddingRight:9,
    paddingLeft:9
  }
});
