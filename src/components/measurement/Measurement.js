import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import {connect} from 'react-redux';
import Entity from './Entity';
import {addNewMeasurement, calculateTotal, addNewSection, updateRoomName, updateDescription, addNewRoom, calculateGrandTotal} from './actions/actions';

const windowWidth = Dimensions.get('window').width;

class Measurement extends Component{
  constructor(props){
    super(props);
    this.renderEntities = this.renderEntities.bind(this);
  }

  renderEntities(){
    return this.props.allEntities.map((singleEntity, index) => {
      return <Entity
      entityIndex={index}
      addNewMeasurement={this.props.addNewMeasurement}
      calculateTotal={this.props.calculateTotal}
      singleEntity={singleEntity}
      addNewSection={this.props.addNewSection}
      updateRoomName={this.props.updateRoomName}
      updateDescription={this.props.updateDescription}/>
    })
  }

  addNewRoom(){
    this.props.addNewRoom({});
    this.forceUpdate();
  }

  onDonePress(){
    this.props.calculateGrandTotal();
    this.props.navigation.navigate('Summary',{username:this.props.navigation.state.params.username});
  }

  render(){
    return(
        <ScrollView style={styles.wrapper}>
        {this.renderEntities()}
        <TouchableOpacity style={styles.addRoomButtonStyle}
        onPress={() => {this.addNewRoom()}}>
          <Text style={styles.buttonText}>+ Add New Room</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {this.onDonePress()}} style={styles.buttonStyle}>
            <Text style={styles.buttonText}>Done</Text>
        </TouchableOpacity>
        </ScrollView>
      )
    }
  }

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  addRoomButtonStyle:{
    borderWidth:1,
    borderColor:'gray',
    borderRadius:10,
    padding:10,
    backgroundColor:'gray',
    width: 150,
    marginLeft: 20,
    marginBottom:20
  },
  buttonText:{
    color:'white',
    fontWeight:'bold',
    fontSize:15,
    textAlign: 'center'
  },
  buttonStyle:{
    padding: 10,
    backgroundColor: 'blue',
    width: 150,
    alignSelf: 'center',
    marginBottom:20
  }
});

const mapStateToProps = (state) => {
  return{
    allEntities: state.measurementReducer.allEntities
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    addNewMeasurement: (obj) => dispatch(addNewMeasurement(obj)),
    calculateTotal: (obj) => dispatch(calculateTotal(obj)),
    addNewSection: (obj) => dispatch(addNewSection(obj)),
    updateRoomName: (obj) => dispatch(updateRoomName(obj)),
    updateDescription: (obj) => dispatch(updateDescription(obj)),
    addNewRoom: (obj) => dispatch(addNewRoom(obj)),
    calculateGrandTotal: () => dispatch(calculateGrandTotal())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Measurement)
