import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TextInput, TouchableOpacity, Image } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import RoomSection from './RoomSection';
import downIcon from '../../images/chevron-down.png';
import upIcon from '../../images/chevron-up.png';

const windowWidth = Dimensions.get('window').width;

export default class Entity extends Component{
  constructor(props){
    super(props);
    this.state = {
      activeSections:[],
      roomName: props.singleEntity.entityName,
    };
    this._updateSections = this._updateSections.bind(this);
    this._renderContent = this._renderContent.bind(this);
  }

  _renderHeader(props,c,i,isActive,s){
    return(
      <View style={styles.headerStyle}>
        <Text style={styles.labelText}>
          {(this.state.roomName !== '') ? this.state.roomName : props.singleEntity.entityName}
        </Text>
        <Image source={(isActive) ? upIcon : downIcon} style={styles.arrowImages}/>
      </View>
    )
  }

  addAdditionOrDeduction(_type){
    let newObj = {
      type: _type,
      entityIndex: this.props.entityIndex
    };
    this.props.addNewSection(newObj);
    this.forceUpdate();
  }

  onInputBlur(_entityIndex){
    let newObj = {
      entityIndex: _entityIndex,
      roomName: this.state.roomName
    }
    this.props.updateRoomName(newObj);
  }

  _renderContent(_singleEntity){
    return(
      <View style={styles.contentStyle}>
      <View style={{flexDirection:'row'}}>
      <View style={styles.labelStyle}>
        <Text style={styles.roomNameLabel}>
          Room Name
        </Text>
      </View>
      <View style={styles.textInputWrapper}>
        <TextInput value={this.state.roomName === 'Room Name' ? '' : this.state.roomName}
        onChangeText={(text) => this.setState({roomName: text})}
        style={styles.inputStyles}
        placeholder='Enter Room Name'
        onBlur={() => {this.onInputBlur(this.props.entityIndex)}}/>
      </View>
      </View>

      {this.renderEachRoomSection(_singleEntity.dimensions)}
      <TouchableOpacity style={styles.addDimensionButtonStyle}
      onPress={() => {this.addAdditionOrDeduction('addition')}}>
        <Text style={styles.buttonText}>+ Addition</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.addDimensionButtonStyleRed}
      onPress={() => {this.addAdditionOrDeduction('deduction')}}>
        <Text style={styles.buttonText}>+ Deduction</Text>
      </TouchableOpacity>
      </View>
    )
  }

  renderEachRoomSection(_eachSection){
    return _eachSection.map((item, index) => {
      return (
        <RoomSection
        section={item}
        sectionIndex={index}
        entityIndex={this.props.entityIndex}
        addNewMeasurement={this.props.addNewMeasurement}
        calculateTotal={this.props.calculateTotal}
        updateDescription={this.props.updateDescription}/>
      )
    })
  }

  _updateSections(activeSections){
    this.setState({ activeSections });
  }

  render(){
    return(
        <View style={styles.accordionParent}>
          <Accordion
            sections={['section']}
            activeSections={this.state.activeSections}
            renderHeader={(c,i,a,s) => this._renderHeader(this.props,c,i,a,s)}
            renderContent={() => this._renderContent(this.props.singleEntity)}
            onChange={this._updateSections}
          />
        </View>
    )
  }
  }

const styles = StyleSheet.create({
  headerStyle:{
    flexDirection:'row',
    backgroundColor: 'gray',
    padding:20
  },
  accordionParent:{
    width: windowWidth,
    margin: 10
  },
  contentStyle:{
    backgroundColor: 'lightgray',
    padding:10,
    flexDirection: 'column'
  },
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
  labelText:{
    color:'white',
    fontWeight:'bold',
    fontSize:20
  },
  roomNameLabel:{
    color:'black',
    fontSize:15
  },
  buttonText:{
    color:'white',
    fontWeight:'bold',
    fontSize:15
  },
  arrowImages:{
    height:30,
    width:30,
    marginLeft: 6
  },
});
