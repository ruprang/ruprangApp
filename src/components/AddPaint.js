import React, {useState} from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import {BASEURL} from '../constants/constants';

export default function Login(props){
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [description, setDesc] = useState('');
  const [isError, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const showMessage = () => {
    setError(true);
    setTimeout(() => {
      setError(false);
    },2000);
  }

  const onLoginPress = () => {
    setLoading(true);
    var stateObj = {
      paint: username,
      price: password,
      description: description
    }
    fetch(`${BASEURL}put_price`,{
      method: 'POST',
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(stateObj)
    })
    .then((response) => response.json())
    .then((responseJson) => {
      setLoading(false);
      alert('paint added successfully');
    })
    .catch((error) => {
      setLoading(false);
      showMessage();
    });
  }

  return(
    <View style={styles.wrapper}>
      <View style={styles.inputsParent}>
        <Text style={styles.label}>Paint name</Text>
        <View style={styles.textInputWrapper}>
          <TextInput
          value={username}
          onChangeText={(text) => {setUsername(text)}}
          style={styles.inputStyles}
          placeholder='Enter paint name'/>
        </View>
      </View>
      <View style={styles.inputsParent}>
        <Text style={styles.label}>Paint price</Text>
        <View style={styles.textInputWrapper}>
          <TextInput
          keyboardType='decimal-pad'
          value={password}
          onChangeText={(text) => {setPassword(text)}}
          style={styles.inputStyles}
          placeholder='Enter paint price'/>
        </View>
      </View>
      <View style={styles.inputsParent}>
        <Text style={styles.label}>Paint description</Text>
        <View style={[styles.textInputWrapper,{width:200,height:100}]}>
          <TextInput
          multiline = {true}
         numberOfLines = {4}
          value={description}
          onChangeText={(text) => {setDesc(text)}}
          style={styles.inputStyles}
          placeholder='Enter description'/>
        </View>
      </View>
      <TouchableOpacity onPress={() => {onLoginPress()}} style={styles.buttonStyle}>
          { !isLoading ? <Text style={styles.buttonText}>Add paint</Text> : <View style={styles.loaderWrapper}><ActivityIndicator size="small"/></View>}
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
