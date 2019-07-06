import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import DimensionSection from './DimensionSection';

const windowWidth = Dimensions.get('window').width;

export default class RoomSection extends Component{
  constructor(props){
    super(props);
    this.state={
      wallDescription: props.section.description
    };
    this.updateParent = this.updateParent.bind(this);
  }

  addNewDimension(_entityIndex, _dimensionObjIndex){
    let payloadObj = {
      entityIndex: _entityIndex,
      dimensionObjIndex: _dimensionObjIndex,
      newMeasurements: {inputLength:'',inputBreadth:''}
    };
    this.props.addNewMeasurement(payloadObj);
    this.forceUpdate();
  }

  onInputBlur(_entityIndex){
    let newObj = {
      entityIndex: _entityIndex,
      sectionIndex: this.props.sectionIndex,
      description: this.state.wallDescription
    }
    this.props.updateDescription(newObj);
  }

  updateParent(){
    this.forceUpdate();
  }

  renderDimensionSection(_dimensions, _itemTypeIndex){
    return _dimensions.measurements.map((item, index) => {
      return (
        <DimensionSection
        entityIndex={this.props.entityIndex}
        dimensionSectionIndex={index}
        sectionIndex={this.props.sectionIndex}
        calculateTotal={this.props.calculateTotal}
        updateParent={this.updateParent}
        dimensionObj={item}/>
    )
    })
  }

  render(){
    return (
      <View style={(this.props.section.type === 'addition') ? styles.sectionStyle : styles.sectionStyleRed}>
      <View style={{flexDirection: 'row'}}>
      <View style={styles.sectionTitleStyle}>
        <Text style={styles.sectionTitle}>
          {this.props.section.name}
        </Text>
      </View>
      {(this.props.section.total !== '') ? <View style={styles.totalStyle}>
        <Text style={styles.sectionTitle}>
          Total {this.props.section.total}
        </Text>
      </View> : null}
      </View>
      <View style={styles.contentRowStyle}>
      <View style={styles.labelStyle}>
        <Text style={styles.roomNameLabel}>
          Description
        </Text>
      </View>
      <View style={styles.textInputWrapper}>
        <TextInput
        value={this.state.wallDescription}
        onChangeText={(text) => this.setState({wallDescription: text})}
        style={styles.inputStyles}
        placeholder='Enter description'
        onBlur={() => {this.onInputBlur(this.props.entityIndex)}}/>
      </View>
      </View>

      {this.renderDimensionSection(this.props.section,this.props.sectionIndex)}

      <TouchableOpacity style={(this.props.section.type === 'addition') ? styles.addDimensionButtonStyle : styles.addDimensionButtonStyleRed}
      onPress={() => {this.addNewDimension(this.props.entityIndex,this.props.sectionIndex)}}>
        <Text style={styles.buttonText}>+ Dimension</Text>
      </TouchableOpacity>

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
  sectionTitleStyle:{
    width: windowWidth/2
  },
  sectionStyle:{
    backgroundColor: 'lightgreen',
    padding: 10,
    marginTop:5,
    marginBottom:5
  },
  sectionStyleRed:{
    backgroundColor: 'pink',
    padding: 10,
    marginTop:5,
    marginBottom:5
  },
  contentRowStyle:{
    flexDirection: 'row',
    marginTop:5,
    marginBottom:5
  },
  addDimensionButtonStyle:{
    borderWidth:1,
    borderColor:'gray',
    borderRadius:5,
    padding:5,
    backgroundColor:'green',
    width: 120,
    marginTop:5
  },
  addDimensionButtonStyleRed:{
    borderWidth:1,
    borderColor:'gray',
    borderRadius:5,
    padding:5,
    backgroundColor:'red',
    width: 120,
    marginTop:5
  },
  totalStyle:{

  },
  sectionTitle:{
    color:'black',
    fontSize:15,
    fontWeight: 'bold'
  },
  roomNameLabel:{
    color:'black',
    fontSize:15
  },
  buttonText:{
    color:'white',
    fontWeight:'bold',
    fontSize:15
  }
});
