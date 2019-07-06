import React, {Component} from 'react';
import {connect} from 'react-redux';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Picker, Dimensions, ScrollView, ActivityIndicator } from 'react-native';
import {updateGrandTotal} from './measurement/actions/actions';
import {BASEURL} from '../constants/constants';

const windowWidth = Dimensions.get('window').width;

class Summary extends Component{
  constructor(props){
    super(props);
    this.state={
      totalCeilingArea: props.allTotal.ceiling.totalArea,
      totalWallArea: props.allTotal.wall.totalArea,
      totalWoodAndMetalArea: props.allTotal.woodAndMetal.totalArea,
      totalExteriorArea: props.allTotal.exterior.totalArea,
      totalProductArea1: props.allTotal.product1.totalArea,
      totalProductArea2: props.allTotal.product2.totalArea,
      selectedCeilingPaintPrice: '',
      selectedCeilingPaintName: '',
      totalCeilingPrice: '',

      selectedWallPaintPrice: '',
      selectedWallPaintName: '',
      totalWallPrice: '',

      selectedWoodAndMetalPaintPrice: '',
      selectedWoodAndMetalPaintName: '',
      totalWoodAndMetalPrice: '',

      selectedExteriorPaintPrice: '',
      selectedExteriorPaintName: '',
      totalExteriorPrice: '',

      selectedProduct1PaintPrice: '',
      selectedProduct1PaintName: '',
      totalProduct1Price: '',

      selectedProduct2PaintPrice: '',
      selectedProduct2PaintName: '',
      totalProduct2Price: '',

      selectedDiscount: '',
      grandTotalPrice: '',
      discountAmount: '',
      allPaints: [],

      isLoading: false
    }
  }

  componentDidMount(){
    fetch(`${BASEURL}get_price`,{
      method: 'GET'
    })
    .then((response) => response.json())
    .then((responseJson) => {
      responseJson.unshift({
        "paint": "Select a paint",
        "price": 0
    })
      this.setState({allPaints:responseJson});
    })
    .catch((error) => {
      alert('Error fetching paints list');
    });
  }

  callAPI(){
      fetch(`${BASEURL}send_mail`,{
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(this.props.stateObj)
      })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({isLoading: false});
        alert('Data sent successfully');
      })
      .catch((error) => {
        this.setState({isLoading: false});
        alert('An error occurred. Please try again later.')
      });
  }

  onNextPress(){
    this.setState({isLoading: true});
    var newObj = {
      totalCeilingArea: this.state.totalCeilingArea,
      totalExteriorArea: this.state.totalExteriorArea,
      totalProductArea1: this.state.totalProductArea1,
      totalProductArea2: this.state.totalProductArea2,
      totalWallArea: this.state.totalWallArea,
      totalWoodAndMetalArea: this.state.totalWoodAndMetalArea,

      selectedCeilingPaintPrice: this.state.selectedCeilingPaintPrice,
      selectedCeilingPaintName: this.state.selectedCeilingPaintName,
      totalCeilingPrice: this.state.totalCeilingPrice,

      selectedWallPaintPrice: this.state.selectedWallPaintPrice,
      selectedWallPaintName: this.state.selectedWallPaintName,
      totalWallPrice: this.state.totalWallPrice,

      selectedWoodAndMetalPaintPrice: this.state.selectedWoodAndMetalPaintPrice,
      selectedWoodAndMetalPaintName: this.state.selectedWoodAndMetalPaintName,
      totalWoodAndMetalPrice: this.state.totalWoodAndMetalPrice,

      selectedExteriorPaintPrice: this.state.selectedExteriorPaintPrice,
      selectedExteriorPaintName: this.state.selectedExteriorPaintName,
      totalExteriorPrice: this.state.totalExteriorPrice,

      selectedProduct1PaintPrice: this.state.selectedProduct1PaintPrice,
      selectedProduct1PaintName: this.state.selectedProduct1PaintName,
      totalProduct1Price: this.state.totalProduct1Price,

      selectedProduct2PaintPrice: this.state.selectedProduct2PaintPrice,
      selectedProduct2PaintName: this.state.selectedProduct2PaintName,
      totalProduct2Price: this.state.totalProduct2Price,

      grandTotalPrice: this.state.grandTotalPrice,
      discountAmount: this.state.discountAmount,
      discount: this.state.selectedDiscount,
      username: this.props.navigation.state.params.username
    }
    this.props.updateGrandTotal(newObj);
    setTimeout(() => {
      this.callAPI();
    });
  }

  renderPickerItems(){
    if(this.state.allPaints.length !== 0){
      return this.state.allPaints.map((item,index) => {
        return <Picker.Item label={(item.price === 0) ? `${item.paint}` : `${item.paint} Rs. ${item.price}`} value={item.paint} />
      })
    }else{
      return <Picker.Item label='Fetching Paints List' value='' />
    }
  }

  calculateAllTotal(){
    if(this.state.selectedCeilingPaintPrice !== '' && this.state.totalCeilingArea !== ''){
      this.setState({totalCeilingPrice: this.state.selectedCeilingPaintPrice * this.state.totalCeilingArea});
    }
    if(this.state.selectedWallPaintPrice !== '' && this.state.totalWallArea !== ''){
      this.setState({totalWallPrice: this.state.selectedWallPaintPrice * this.state.totalWallArea});
    }
    if(this.state.selectedWoodAndMetalPaintPrice !== '' && this.state.totalWoodAndMetalArea !== ''){
      this.setState({totalWoodAndMetalPrice: this.state.selectedWoodAndMetalPaintPrice * this.state.totalWoodAndMetalArea});
    }
    if(this.state.selectedExteriorPaintPrice !== '' && this.state.totalExteriorArea !== ''){
      this.setState({totalExteriorPrice: this.state.selectedExteriorPaintPrice * this.state.totalExteriorArea});
    }
    if(this.state.selectedProduct1PaintPrice !== '' && this.state.totalProductArea1 !== ''){
      this.setState({totalProduct1Price: this.state.selectedProduct1PaintPrice * this.state.totalProductArea1});
    }
    if(this.state.selectedProduct2PaintPrice !== '' && this.state.totalProductArea2 !== ''){
      this.setState({totalProduct2Price: this.state.selectedProduct2PaintPrice * this.state.totalProductArea2});
    }
    if(
      this.state.totalCeilingPrice !== '' &&
      this.state.totalWallPrice !== '' &&
      this.state.totalWoodAndMetalPrice !== '' &&
      this.state.totalExteriorPrice !== ''
    ){
      this.setState({discountAmount: (this.state.totalCeilingPrice + this.state.totalWallPrice + this.state.totalWoodAndMetalPrice + this.state.totalExteriorPrice) - ((this.state.totalCeilingPrice + this.state.totalWallPrice + this.state.totalWoodAndMetalPrice + this.state.totalExteriorPrice) * ((100 - this.state.selectedDiscount)/100))});
      this.setState({grandTotalPrice: (this.state.totalCeilingPrice + this.state.totalWallPrice + this.state.totalWoodAndMetalPrice + this.state.totalExteriorPrice) * ((100 - this.state.selectedDiscount)/100)});
    }

    if(
      this.state.totalCeilingPrice !== '' &&
      this.state.totalWallPrice !== '' &&
      this.state.totalWoodAndMetalPrice !== '' &&
      this.state.totalExteriorPrice !== '' &&
      this.state.totalProduct1Price !== ''
    ){
      this.setState({discountAmount: (this.state.totalCeilingPrice + this.state.totalWallPrice + this.state.totalWoodAndMetalPrice + this.state.totalExteriorPrice + this.state.totalProduct1Price) - ((this.state.totalCeilingPrice + this.state.totalWallPrice + this.state.totalWoodAndMetalPrice + this.state.totalExteriorPrice + this.state.totalProduct1Price) * ((100 - this.state.selectedDiscount)/100))});
      this.setState({grandTotalPrice: (this.state.totalCeilingPrice + this.state.totalWallPrice + this.state.totalWoodAndMetalPrice + this.state.totalExteriorPrice + this.state.totalProduct1Price) * ((100 - this.state.selectedDiscount)/100)});
    }

    if(
      this.state.totalCeilingPrice !== '' &&
      this.state.totalWallPrice !== '' &&
      this.state.totalWoodAndMetalPrice !== '' &&
      this.state.totalExteriorPrice !== '' &&
      this.state.totalProduct2Price !== ''
    ){
      this.setState({discountAmount: (this.state.totalCeilingPrice + this.state.totalWallPrice + this.state.totalWoodAndMetalPrice + this.state.totalExteriorPrice + this.state.totalProduct2Price) - ((this.state.totalCeilingPrice + this.state.totalWallPrice + this.state.totalWoodAndMetalPrice + this.state.totalExteriorPrice + this.state.totalProduct2Price) * ((100 - this.state.selectedDiscount)/100))});
      this.setState({grandTotalPrice: (this.state.totalCeilingPrice + this.state.totalWallPrice + this.state.totalWoodAndMetalPrice + this.state.totalExteriorPrice + this.state.totalProduct2Price) * ((100 - this.state.selectedDiscount)/100)});
    }

    if(
      this.state.totalCeilingPrice !== '' &&
      this.state.totalWallPrice !== '' &&
      this.state.totalWoodAndMetalPrice !== '' &&
      this.state.totalExteriorPrice !== '' &&
      this.state.totalProduct1Price !== '' &&
      this.state.totalProduct2Price !== ''
    ){
      this.setState({discountAmount: (this.state.totalCeilingPrice + this.state.totalWallPrice + this.state.totalWoodAndMetalPrice + this.state.totalExteriorPrice + this.state.totalProduct1Price + this.state.totalProduct2Price) - ((this.state.totalCeilingPrice + this.state.totalWallPrice + this.state.totalWoodAndMetalPrice + this.state.totalExteriorPrice + this.state.totalProduct1Price + this.state.totalProduct2Price) * ((100 - this.state.selectedDiscount)/100))});
      this.setState({grandTotalPrice: (this.state.totalCeilingPrice + this.state.totalWallPrice + this.state.totalWoodAndMetalPrice + this.state.totalExteriorPrice + this.state.totalProduct1Price + this.state.totalProduct2Price) * ((100 - this.state.selectedDiscount)/100)});
    }
  }

  render(){
    return(
      <ScrollView style={styles.wrapper}>

        <View style={[styles.inputsParent, {marginTop:0}]}>
          <Text style={styles.label}>Ceiling</Text>
          <View style={styles.textInputWrapper}>
            <TextInput
            keyboardType='decimal-pad'
            value={this.state.totalCeilingArea}
            onChangeText={(text) => {this.setState({totalCeilingArea:text},() => {this.calculateAllTotal()})}}
            style={styles.inputStyles}
            placeholder='Enter total ceiling area'/>
          </View>
        </View>
        <View style={styles.inputsParent}>
          <Text style={styles.label}>Select Paint</Text>
          <View style={styles.textInputWrapper}>
            <Picker
              selectedValue={this.state.selectedCeilingPaintName}
              style={styles.dropdown}
              onValueChange={(itemValue, itemIndex) => {
                this.setState({selectedCeilingPaintPrice: this.state.allPaints[itemIndex].price, selectedCeilingPaintName: this.state.allPaints[itemIndex].paint},() => {
                  this.calculateAllTotal();
                });
              }
              }>
              {this.renderPickerItems()}
            </Picker>
          </View>
        </View>
        <View style={[styles.inputsParent, {borderBottomWidth:1,borderBottomColor:'gray',width:windowWidth-20, padding:10}]}>
          <Text style={{fontSize:15, textAlign:'center', color: 'green', fontWeight:'bold'}}>Total: Rs. {this.state.totalCeilingPrice}</Text>
        </View>

        <View style={styles.inputsParent}>
          <Text style={styles.label}>Walls</Text>
          <View style={styles.textInputWrapper}>
            <TextInput
            keyboardType='decimal-pad'
            value={this.state.totalWallArea}
            onChangeText={(text) => {this.setState({totalWallArea:text},() => {this.calculateAllTotal()})}}
            style={styles.inputStyles}
            placeholder='Enter total walls area'/>
          </View>
        </View>
        <View style={styles.inputsParent}>
          <Text style={styles.label}>Select Paint</Text>
          <View style={styles.textInputWrapper}>
            <Picker
              selectedValue={this.state.selectedWallPaintName}
              style={styles.dropdown}
              onValueChange={(itemValue, itemIndex) => {
                this.setState({selectedWallPaintPrice: this.state.allPaints[itemIndex].price, selectedWallPaintName: this.state.allPaints[itemIndex].paint},() => {
                  this.calculateAllTotal();
                });
              }
              }>
              {this.renderPickerItems()}
            </Picker>
          </View>
        </View>
        <View style={[styles.inputsParent, {borderBottomWidth:1,borderBottomColor:'gray',width:windowWidth-20, padding:10}]}>
          <Text style={{fontSize:15, textAlign:'center', color: 'green', fontWeight:'bold'}}>Total: Rs. {this.state.totalWallPrice}</Text>
        </View>

        <View style={styles.inputsParent}>
          <Text style={styles.label}>Wood and Metal</Text>
          <View style={styles.textInputWrapper}>
            <TextInput
            keyboardType='decimal-pad'
            value={this.state.totalWoodAndMetalArea}
            onChangeText={(text) => {this.setState({totalWoodAndMetalArea:text},() => {this.calculateAllTotal()})}}
            style={styles.inputStyles}
            placeholder='Enter total wood and metal area'/>
          </View>
        </View>
        <View style={styles.inputsParent}>
          <Text style={styles.label}>Select Paint</Text>
          <View style={styles.textInputWrapper}>
            <Picker
              selectedValue={this.state.selectedWoodAndMetalPaintName}
              style={styles.dropdown}
              onValueChange={(itemValue, itemIndex) => {
                this.setState({selectedWoodAndMetalPaintPrice: this.state.allPaints[itemIndex].price, selectedWoodAndMetalPaintName: this.state.allPaints[itemIndex].paint},() => {
                  this.calculateAllTotal();
                });
              }
              }>
              {this.renderPickerItems()}
            </Picker>
          </View>
        </View>
        <View style={[styles.inputsParent, {borderBottomWidth:1,borderBottomColor:'gray',width:windowWidth-20, padding:10}]}>
          <Text style={{fontSize:15, textAlign:'center', color: 'green', fontWeight:'bold'}}>Total: Rs. {this.state.totalWoodAndMetalPrice}</Text>
        </View>

        <View style={styles.inputsParent}>
          <Text style={styles.label}>Exteriors</Text>
          <View style={styles.textInputWrapper}>
            <TextInput
            keyboardType='decimal-pad'
            value={this.state.totalExteriorArea}
            onChangeText={(text) => {this.setState({totalExteriorArea:text},() => {this.calculateAllTotal()})}}
            style={styles.inputStyles}
            placeholder='Enter total exterior area'/>
          </View>
        </View>
        <View style={styles.inputsParent}>
          <Text style={styles.label}>Select Paint</Text>
          <View style={styles.textInputWrapper}>
            <Picker
              selectedValue={this.state.selectedExteriorPaintName}
              style={styles.dropdown}
              onValueChange={(itemValue, itemIndex) => {
                this.setState({selectedExteriorPaintPrice: this.state.allPaints[itemIndex].price, selectedExteriorPaintName: this.state.allPaints[itemIndex].paint},() => {
                  this.calculateAllTotal();
                });
              }
              }>
              {this.renderPickerItems()}
            </Picker>
          </View>
        </View>
        <View style={[styles.inputsParent, {borderBottomWidth:1,borderBottomColor:'gray',width:windowWidth-20, padding:10}]}>
          <Text style={{fontSize:15, textAlign:'center', color: 'green', fontWeight:'bold'}}>Total: Rs. {this.state.totalExteriorPrice}</Text>
        </View>

        <View style={styles.inputsParent}>
          <Text style={styles.label}>Customer Product 1</Text>
          <View style={styles.textInputWrapper}>
            <TextInput
            keyboardType='decimal-pad'
            value={this.state.totalProductArea1}
            onChangeText={(text) => {this.setState({totalProductArea1:text},() => {this.calculateAllTotal()})}}
            style={styles.inputStyles}
            placeholder='Enter total product area'/>
          </View>
        </View>
        <View style={styles.inputsParent}>
          <Text style={styles.label}>Select Paint</Text>
          <View style={styles.textInputWrapper}>
            <Picker
              selectedValue={this.state.selectedProduct1PaintName}
              style={styles.dropdown}
              onValueChange={(itemValue, itemIndex) => {
                this.setState({selectedProduct1PaintPrice: this.state.allPaints[itemIndex].price, selectedProduct1PaintName: this.state.allPaints[itemIndex].paint},() => {
                  this.calculateAllTotal();
                });
              }
              }>
              {this.renderPickerItems()}
            </Picker>
          </View>
        </View>
        <View style={[styles.inputsParent, {borderBottomWidth:1,borderBottomColor:'gray',width:windowWidth-20, padding:10}]}>
          <Text style={{fontSize:15, textAlign:'center', color: 'green', fontWeight:'bold'}}>Total: Rs. {this.state.totalProduct1Price}</Text>
        </View>

        <View style={styles.inputsParent}>
          <Text style={styles.label}>Customer Product 2</Text>
          <View style={styles.textInputWrapper}>
            <TextInput
            keyboardType='decimal-pad'
            value={this.state.totalProductArea2}
            onChangeText={(text) => {this.setState({totalProductArea2:text},() => {this.calculateAllTotal()})}}
            style={styles.inputStyles}
            placeholder='Enter total product area'/>
          </View>
        </View>
        <View style={styles.inputsParent}>
          <Text style={styles.label}>Select Paint</Text>
          <View style={styles.textInputWrapper}>
            <Picker
              selectedValue={this.state.selectedProduct2PaintName}
              style={styles.dropdown}
              onValueChange={(itemValue, itemIndex) => {
                this.setState({selectedProduct2PaintPrice: this.state.allPaints[itemIndex].price, selectedProduct2PaintName: this.state.allPaints[itemIndex].paint},() => {
                  this.calculateAllTotal();
                });
              }
              }>
              {this.renderPickerItems()}
            </Picker>
          </View>
        </View>
        <View style={[styles.inputsParent, {borderBottomWidth:1,borderBottomColor:'gray',width:windowWidth-20, padding:10}]}>
          <Text style={{fontSize:15, textAlign:'center', color: 'green', fontWeight:'bold'}}>Total: Rs. {this.state.totalProduct2Price}</Text>
        </View>

        <View style={styles.inputsParent}>
          <Text style={styles.label}>Discount %</Text>
          <View style={styles.textInputWrapper}>
            <TextInput
            keyboardType='decimal-pad'
            value={this.state.selectedDiscount}
            onChangeText={(text) => {
              this.setState({selectedDiscount: text},() => {
                this.calculateAllTotal();
              });
            }}
            style={styles.inputStyles}
            placeholder='Enter discount %'/>
          </View>
        </View>
        <View style={[styles.inputsParent, {borderBottomWidth:1,borderBottomColor:'gray',width:windowWidth-20, padding:10}]}>
          <Text style={{fontSize:25, textAlign:'center', color: 'green', fontWeight:'bold'}}>Grand Total: Rs. {parseFloat(this.state.grandTotalPrice).toFixed(2)}</Text>
        </View>

        <TouchableOpacity onPress={() => {this.onNextPress()}} style={styles.buttonStyle}>
        { !this.state.isLoading ? <Text style={styles.buttonText}>Submit</Text> : <View style={styles.loaderWrapper}><ActivityIndicator size="small"/></View>}
        </TouchableOpacity>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop:10
  },
  inputsParent:{
    flexDirection: 'row',
    alignItems: 'center',
    margin:5
  },
  buttonStyle:{
    padding: 10,
    backgroundColor: 'blue',
    width: 75,
    alignSelf: 'center',
    marginBottom: 20
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
  },
  dropdown:{
    height: 50,
    width: 200
  },
  dropdownWrapper:{
    borderWidth: 1,
    borderColor: 'gray'
  },
  addRoomButtonStyle:{
    borderWidth:1,
    borderColor:'gray',
    borderRadius:10,
    padding:10,
    backgroundColor:'gray',
    width: 150,
    marginTop: 20,
    marginLeft: 20,
    marginBottom:20
  },
});

const mapStateToProps = (state) => {
  return{
    allTotal: state.measurementReducer.allTotal,
    stateObj: state.measurementReducer
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    updateGrandTotal: (obj) => dispatch(updateGrandTotal(obj))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Summary)
