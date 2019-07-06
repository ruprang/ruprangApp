import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TextInput, TouchableOpacity } from 'react-native';

const windowWidth = Dimensions.get('window').width;

export default class RoomSection extends Component{
  constructor(props){
    super(props);
    this.state={
      inputLength: props.dimensionObj.inputLength,
      inputBreadth: props.dimensionObj.inputBreadth,
      inputNumber: props.dimensionObj.inputNumber
    };
  }

  onInputBlur(_entityIndex, _sectionIndex){
    let payloadObj = {
      entityIndex: _entityIndex,
      sectionIndex: _sectionIndex,
      dimensionObjIndex:this.props.dimensionSectionIndex,
      dimensions:{inputLength: this.state.inputLength, inputBreadth: this.state.inputBreadth, inputNumber:this.state.inputNumber}
    };
    this.props.calculateTotal(payloadObj);
    this.props.updateParent();
  }

  render(){
    return(
      <View style={styles.contentRowStyle}>
      <View style={styles.labelStyle}>
        <Text style={styles.roomNameLabel}>
          Dimensions
        </Text>
      </View>
      <View style={styles.textInputWrapper}>
        <TextInput
        keyboardType='decimal-pad'
        value={this.state.inputNumber}
        onChangeText={(text) => {this.setState({inputNumber:text})}}
        onBlur={() => {this.onInputBlur(this.props.entityIndex,this.props.sectionIndex)}}
        style={styles.inputStyles}
        placeholder='Number'/>
      </View>
      <View style={styles.textInputWrapper}>
        <TextInput
        keyboardType='decimal-pad'
        value={this.state.inputLength}
        onChangeText={(text) => {this.setState({inputLength:text})}}
        onBlur={() => {this.onInputBlur(this.props.entityIndex,this.props.sectionIndex)}}
        style={styles.inputStyles}
        placeholder='Length'/>
      </View>
      <View style={styles.textInputWrapper}>
        <TextInput
        keyboardType='decimal-pad'
        value={this.state.inputBreadth}
        onChangeText={(text) => {this.setState({inputBreadth:text})}}
        onBlur={() => {this.onInputBlur(this.props.entityIndex,this.props.sectionIndex)}}
        style={styles.inputStyles}
        placeholder='Breadth'/>
      </View>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  inputStyles:{
    padding: 10,
    paddingTop: 5,
    paddingBottom: 5
  },
  textInputWrapper:{
    borderWidth: 1,
    borderColor: 'gray',
    marginLeft: 5
  },
  labelStyle:{
    paddingTop: 10
  },
  contentRowStyle:{
    flexDirection: 'row',
    marginTop:5,
    marginBottom:5
  },
  roomNameLabel:{
    color:'black',
    fontSize:15
  }
});
