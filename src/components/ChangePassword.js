import React, {useState} from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import {BASEURL} from '../constants/constants';

export default function ChangePassword(props){
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [reEnterNewPassword, setRenterNewPassword] = useState('');
  const [isError, setError] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const showMessage = () => {
    setError(true);
    setTimeout(() => {
      setError(false);
    },5000);
  }

  const showSuccessMessage = () => {
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    },5000);
  }

  const validatePwds = () => {
    if(newPassword === reEnterNewPassword){
      onLoginPress();
    }else{
      alert("Passwords do not match");
    }
  }

  const onLoginPress = () => {
    setLoading(true);
    fetch(`${BASEURL}change_pwd?username=${props.navigation.state.params.username}&password=${oldPassword}&new_password=${newPassword}`,{
      method: 'POST'
    })
    .then((response) => response.json())
    .then((responseJson) => {
      setLoading(false);
      if(responseJson.success){
        showSuccessMessage();
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
      <View style={styles.inputsParent}>
        <Text style={styles.label}>Old Password</Text>
        <View style={styles.textInputWrapper}>
          <TextInput
          secureTextEntry={true}
          value={oldPassword}
          onChangeText={(text) => {setOldPassword(text)}}
          style={styles.inputStyles}
          placeholder='Enter old password'/>
        </View>
      </View>
      <View style={styles.inputsParent}>
        <Text style={styles.label}>New Password</Text>
        <View style={styles.textInputWrapper}>
          <TextInput
          secureTextEntry={true}
          value={newPassword}
          onChangeText={(text) => {setNewPassword(text)}}
          style={styles.inputStyles}
          placeholder='Enter new password'/>
        </View>
      </View>
      <View style={styles.inputsParent}>
        <Text style={styles.label}>Re-enter New Password</Text>
        <View style={styles.textInputWrapper}>
          <TextInput
          secureTextEntry={true}
          value={reEnterNewPassword}
          onChangeText={(text) => {setRenterNewPassword(text)}}
          style={styles.inputStyles}
          placeholder='Enter new password'/>
        </View>
      </View>
      <TouchableOpacity onPress={() => {validatePwds()}} style={styles.buttonStyle}>
          { !isLoading ? <Text style={styles.buttonText}>Submit</Text> : <View style={styles.loaderWrapper}><ActivityIndicator size="small"/></View>}
      </TouchableOpacity>
      {isError ? <View style={styles.errorWrapper}>
        <Text style={styles.errorText}>An error occurred. Please try again later.</Text>
      </View> : null}
      {isSuccess ? <View style={styles.errorWrapper}>
        <Text style={styles.successText}>Password updated successfully.</Text>
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
  successText:{
    color: 'green'
  },
  errorWrapper:{
    marginTop: 10
  },
  loaderWrapper:{
    paddingRight:9,
    paddingLeft:9
  }
});
