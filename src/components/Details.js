import React, {Component} from 'react';
import {connect} from 'react-redux';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import {updateCustomerDetails} from './measurement/actions/actions';

class Details extends Component{
  constructor(props){
    super(props);
    this.state={
      customerName: props.customerDetails.customerName,
      customerAddress: props.customerDetails.customerAddress,
      contactNumber: props.customerDetails.contactNumber,
      emailId: props.customerDetails.emailId
    }
  }

  onNextPress(){
    var newObj = {
      customerName: this.state.customerName,
      customerAddress: this.state.customerAddress,
      contactNumber: this.state.contactNumber,
      emailId: this.state.emailId
    }
    this.props.updateCustomerDetails(newObj);
    this.props.navigation.navigate('Measurement',{username:this.props.navigation.state.params.username});
  }

  render(){
    return(
      <View style={styles.wrapper}>
        <View style={styles.inputsParent}>
          <Text style={styles.label}>Name</Text>
          <View style={styles.textInputWrapper}>
            <TextInput
            value={this.state.customerName}
            onChangeText={(text) => {this.setState({customerName:text})}}
            style={styles.inputStyles}
            placeholder='Enter Customer Name'/>
          </View>
        </View>
        <View style={styles.inputsParent}>
          <Text style={styles.label}>Address</Text>
          <View style={styles.textInputWrapper}>
            <TextInput
            value={this.state.customerAddress}
            onChangeText={(text) => {this.setState({customerAddress:text})}}
            style={styles.inputStyles}
            placeholder='Enter Customer Address'/>
          </View>
        </View>
        <View style={styles.inputsParent}>
          <Text style={styles.label}>Contact Number</Text>
          <View style={styles.textInputWrapper}>
            <TextInput
            keyboardType='decimal-pad'
            value={this.state.contactNumber}
            onChangeText={(text) => {this.setState({contactNumber:text})}}
            style={styles.inputStyles}
            placeholder='Enter Customer Contact Number'/>
          </View>
        </View>
        <View style={styles.inputsParent}>
          <Text style={styles.label}>Email ID</Text>
          <View style={styles.textInputWrapper}>
            <TextInput
            value={this.state.emailId}
            onChangeText={(text) => {this.setState({emailId:text})}}
            style={styles.inputStyles}
            placeholder='Enter Customer Email ID'/>
          </View>
        </View>
        <TouchableOpacity onPress={() => {this.onNextPress()}} style={styles.buttonStyle}>
            <Text style={styles.buttonText}>Next</Text>
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
  inputsParent:{
    flexDirection: 'row',
    alignItems: 'center',
    margin:5
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
  label:{
    color:'black',
    fontSize:15
  },
  buttonText:{
    color:'white',
    fontWeight:'bold',
    fontSize:15
  }
});

const mapStateToProps = (state) => {
  return{
    customerDetails: state.measurementReducer.customerDetails
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    updateCustomerDetails: (obj) => dispatch(updateCustomerDetails(obj))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Details)
