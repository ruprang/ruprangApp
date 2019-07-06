const initialState = {
  username: '',
  customerDetails:{
    customerName: '',
    customerAddress: '',
    contactNumber: '',
    emailId: ''
  },
  allTotal:{
    grandTotalCost: '',
    discountAmount: '',
    discount: '',
    ceiling: {
      paintName: '',
      paintRate: '',
      totalArea: '',
      totalAmount: ''
    },
    exterior: {
      paintName: '',
      paintRate: '',
      totalArea: '',
      totalAmount: ''
    },
    wall: {
      paintName: '',
      paintRate: '',
      totalArea: '',
      totalAmount: ''
    },
    woodAndMetal: {
      paintName: '',
      paintRate: '',
      totalArea: '',
      totalAmount: ''
    },
    product1:{
      paintName: '',
      paintRate: '',
      totalArea: '',
      totalAmount: ''
    },
    product2:{
      paintName: '',
      paintRate: '',
      totalArea: '',
      totalAmount: ''
    }
  },
  allEntities: [
    {
      entityName: 'Room Name',
      totalCeilingArea: '',
      totalExteriorArea: '',
      totalWallArea: '',
      totalWoodAndMetalArea: '',
      dimensions: [
        {
          type: 'addition',
          name: 'Ceiling',
          description: '',
          measurements: [{inputLength:'',inputBreadth:'',inputNumber:''},{inputLength:'',inputBreadth:'',inputNumber:''}],
          total: ''
        },
        {
          type: 'addition',
          name: 'Wall',
          description: '',
          measurements: [{inputLength:'',inputBreadth:'',inputNumber:''},{inputLength:'',inputBreadth:'',inputNumber:''}],
          total: ''
        },
        {
          type: 'deduction',
          name: 'Furniture and Opening, Doors and Grill',
          description: '',
          measurements: [{inputLength:'',inputBreadth:'',inputNumber:''},{inputLength:'',inputBreadth:'',inputNumber:''}],
          total: ''
        },
        {
          type: 'addition',
          name: 'Add Extras, Jam',
          description: '',
          measurements: [{inputLength:'',inputBreadth:'',inputNumber:''},{inputLength:'',inputBreadth:'',inputNumber:''}],
          total: ''
        },
        {
          type: 'addition',
          name: 'Doors and Grill (To paint)',
          description: '',
          measurements: [{inputLength:'',inputBreadth:'',inputNumber:''},{inputLength:'',inputBreadth:'',inputNumber:''}],
          total: ''
        },
        {
          type: 'addition',
          name: 'Exteriors',
          description: '',
          measurements: [{inputLength:'',inputBreadth:'',inputNumber:''},{inputLength:'',inputBreadth:'',inputNumber:''}],
          total: ''
        }
      ]
    },
    {
      entityName: 'Room Name',
      totalCeilingArea: '',
      totalExteriorArea: '',
      totalWallArea: '',
      totalWoodAndMetalArea: '',
      dimensions: [
        {
          type: 'addition',
          name: 'Ceiling',
          description: '',
          measurements: [{inputLength:'',inputBreadth:'',inputNumber:''},{inputLength:'',inputBreadth:'',inputNumber:''}],
          total: ''
        },
        {
          type: 'addition',
          name: 'Wall',
          description: '',
          measurements: [{inputLength:'',inputBreadth:'',inputNumber:''},{inputLength:'',inputBreadth:'',inputNumber:''}],
          total: ''
        },
        {
          type: 'deduction',
          name: 'Furniture and Opening, Doors and Grill',
          description: '',
          measurements: [{inputLength:'',inputBreadth:'',inputNumber:''},{inputLength:'',inputBreadth:'',inputNumber:''}],
          total: ''
        },
        {
          type: 'addition',
          name: 'Add Extras, Jam',
          description: '',
          measurements: [{inputLength:'',inputBreadth:'',inputNumber:''},{inputLength:'',inputBreadth:'',inputNumber:''}],
          total: ''
        },
        {
          type: 'addition',
          name: 'Doors and Grill (To paint)',
          description: '',
          measurements: [{inputLength:'',inputBreadth:'',inputNumber:''},{inputLength:'',inputBreadth:'',inputNumber:''}],
          total: ''
        },
        {
          type: 'addition',
          name: 'Exteriors',
          description: '',
          measurements: [{inputLength:'',inputBreadth:'',inputNumber:''},{inputLength:'',inputBreadth:'',inputNumber:''}],
          total: ''
        }
      ]
    },
    {
      entityName: 'Room Name',
      totalCeilingArea: '',
      totalExteriorArea: '',
      totalWallArea: '',
      totalWoodAndMetalArea: '',
      dimensions: [
        {
          type: 'addition',
          name: 'Ceiling',
          description: '',
          measurements: [{inputLength:'',inputBreadth:'',inputNumber:''},{inputLength:'',inputBreadth:'',inputNumber:''}],
          total: ''
        },
        {
          type: 'addition',
          name: 'Wall',
          description: '',
          measurements: [{inputLength:'',inputBreadth:'',inputNumber:''},{inputLength:'',inputBreadth:'',inputNumber:''}],
          total: ''
        },
        {
          type: 'deduction',
          name: 'Furniture and Opening, Doors and Grill',
          description: '',
          measurements: [{inputLength:'',inputBreadth:'',inputNumber:''},{inputLength:'',inputBreadth:'',inputNumber:''}],
          total: ''
        },
        {
          type: 'addition',
          name: 'Add Extras, Jam',
          description: '',
          measurements: [{inputLength:'',inputBreadth:'',inputNumber:''},{inputLength:'',inputBreadth:'',inputNumber:''}],
          total: ''
        },
        {
          type: 'addition',
          name: 'Doors and Grill (To paint)',
          description: '',
          measurements: [{inputLength:'',inputBreadth:'',inputNumber:''},{inputLength:'',inputBreadth:'',inputNumber:''}],
          total: ''
        },
        {
          type: 'addition',
          name: 'Exteriors',
          description: '',
          measurements: [{inputLength:'',inputBreadth:'',inputNumber:''},{inputLength:'',inputBreadth:'',inputNumber:''}],
          total: ''
        }
      ]
    }
  ]
}

export default function measurementReducer ( state = initialState, action ){
  switch (action.type) {
    case 'ADD_NEW_DIMENSION':{
      let {entityIndex, dimensionObjIndex, newMeasurements} = action.payload;
      state.allEntities[entityIndex].dimensions[dimensionObjIndex].measurements.push(newMeasurements);
      return state;
    }
      break;
    case 'CALCULATE_TOTAL':{
      let {entityIndex, sectionIndex, dimensionObjIndex, dimensions} = action.payload;
      let currentArray = state.allEntities[entityIndex].dimensions[sectionIndex].measurements;
      let currentTotal = 0;
      state.allEntities[entityIndex].dimensions[sectionIndex].measurements[dimensionObjIndex] = dimensions;
      currentArray.map((item) => {
        if(item.inputLength !== '' && item.inputBreadth !== '' && item.inputNumber !== ''){
          currentTotal += (item.inputLength * item.inputBreadth * item.inputNumber);
        }
      });

      currentTotal = (currentTotal === 0) ? '' : currentTotal.toFixed(2);

      state.allEntities[entityIndex].dimensions[sectionIndex].total = currentTotal;
      calculateAllTotalsForSingleEntity(state.allEntities[entityIndex]);

      return state;
    }
        break;
    case 'CALCULATE_GRAND_TOTAL':{
      var _grandTotalCeilingArea = 0, _grandTotalExteriorArea = 0, _grandTotalWallArea = 0, _grandTotalWoodAndMetalArea = 0;

      state.allEntities.map((item, index) => {
        if(item.totalCeilingArea !== ''){
          item.totalCeilingArea = parseFloat(item.totalCeilingArea);
          _grandTotalCeilingArea += item.totalCeilingArea;
        }

        if(item.totalExteriorArea !== ''){
          item.totalExteriorArea = parseFloat(item.totalExteriorArea);
          _grandTotalExteriorArea += item.totalExteriorArea;
        }

        if(item.totalWallArea !== ''){
          item.totalWallArea = parseFloat(item.totalWallArea);
          _grandTotalWallArea += item.totalWallArea;
        }

        if(item.totalWoodAndMetalArea !== ''){
          item.totalWoodAndMetalArea = parseFloat(item.totalWoodAndMetalArea);
          _grandTotalWoodAndMetalArea += item.totalWoodAndMetalArea;
        }
      });

      state.allTotal.ceiling.totalArea = _grandTotalCeilingArea.toFixed(2);
      state.allTotal.exterior.totalArea = _grandTotalExteriorArea.toFixed(2);
      state.allTotal.wall.totalArea = _grandTotalWallArea.toFixed(2);
      state.allTotal.woodAndMetal.totalArea = _grandTotalWoodAndMetalArea.toFixed(2);

      return state;
    }
      break;
    case 'UPDATE_GRAND_TOTAL':{
        let {
          totalCeilingArea,
          totalExteriorArea,
          totalWallArea,
          totalWoodAndMetalArea,
          totalProductArea1,
          totalProductArea2,
          selectedCeilingPaintPrice,
          selectedCeilingPaintName,
          totalCeilingPrice,
          selectedWallPaintPrice,
          selectedWallPaintName,
          totalWallPrice,
          selectedWoodAndMetalPaintPrice,
          selectedWoodAndMetalPaintName,
          totalWoodAndMetalPrice,
          selectedExteriorPaintPrice,
          selectedExteriorPaintName,
          totalExteriorPrice,
          selectedProduct1PaintPrice,
          selectedProduct1PaintName,
          totalProduct1Price,
          selectedProduct2PaintPrice,
          selectedProduct2PaintName,
          totalProduct2Price,
          grandTotalPrice,
          discountAmount,
          username,
          discount
        } = action.payload;

        state.allTotal.ceiling.totalArea = totalCeilingArea;
        state.allTotal.ceiling.paintName = (selectedCeilingPaintPrice !== 0 || selectedCeilingPaintPrice !== '0') ? selectedCeilingPaintName : '';
        state.allTotal.ceiling.paintRate = selectedCeilingPaintPrice;
        state.allTotal.ceiling.totalAmount = totalCeilingPrice;

        state.allTotal.exterior.totalArea = totalExteriorArea;
        state.allTotal.exterior.paintName = (selectedExteriorPaintPrice !== 0 || selectedExteriorPaintPrice !== '0') ? selectedExteriorPaintName : '';
        state.allTotal.exterior.paintRate = selectedExteriorPaintPrice;
        state.allTotal.exterior.totalAmount = totalExteriorPrice;

        state.allTotal.wall.totalArea = totalWallArea;
        state.allTotal.wall.paintName = (selectedWallPaintPrice !== 0 || selectedWallPaintPrice !== '0') ? selectedWallPaintName : '';
        state.allTotal.wall.paintRate = selectedWallPaintPrice;
        state.allTotal.wall.totalAmount = totalWallPrice;

        state.allTotal.woodAndMetal.totalArea = totalWoodAndMetalArea;
        state.allTotal.woodAndMetal.paintName = (selectedWoodAndMetalPaintPrice !== 0 || selectedWoodAndMetalPaintPrice !== '0') ? selectedWoodAndMetalPaintName : '';
        state.allTotal.woodAndMetal.paintRate = selectedWoodAndMetalPaintPrice;
        state.allTotal.woodAndMetal.totalAmount = totalWoodAndMetalPrice;

        state.allTotal.product1.totalArea = totalProductArea1;
        state.allTotal.product1.paintName = (selectedProduct1PaintPrice !== 0 || selectedProduct1PaintPrice !== '0') ? selectedProduct1PaintName : '';
        state.allTotal.product1.paintRate = selectedProduct1PaintPrice;
        state.allTotal.product1.totalAmount = totalProduct1Price;

        state.allTotal.product2.totalArea = totalProductArea2;
        state.allTotal.product2.paintName = (selectedProduct2PaintPrice !== 0 || selectedProduct2PaintPrice !== '0') ? selectedProduct2PaintName : '';
        state.allTotal.product2.paintRate = selectedProduct2PaintPrice;
        state.allTotal.product2.totalAmount = totalProduct2Price;

        state.allTotal.grandTotalCost = grandTotalPrice;
        state.allTotal.discountAmount = discountAmount;
        state.allTotal.discount = discount;
        state.username = username;

        return state;
      }
        break;
    case 'ADD_NEW_SECTION':{
      let {type, entityIndex} = action.payload;
      let newObj = {
        type: '',
        name: '',
        description: '',
        measurements: [{inputLength:'',inputBreadth:'',inputNumber:''},{inputLength:'',inputBreadth:'',inputNumber:''}],
        total: ''
      };
      newObj.type = type;
      newObj.name = type;
      state.allEntities[entityIndex].dimensions.push(newObj);
      return state;
    }
        break;
    case 'UPDATE_ROOMNAME':{
      let {entityIndex, roomName} = action.payload;
      state.allEntities[entityIndex].entityName = roomName;
      return state;
    }
        break;
    case 'UPDATE_DESCRIPTION':{
      let {entityIndex, sectionIndex, description} = action.payload;
      state.allEntities[entityIndex].dimensions[sectionIndex].description = description;
      return state;
    }
        break;
    case 'ADD_NEW_ROOM':{
      var newRoomObj = JSON.parse(JSON.stringify(newRoom))
      state.allEntities.push(newRoomObj);
      return state;
    }
        break;
    case 'UPDATE_CUSTOMER_DETAILS':{
        let {customerName, customerAddress, contactNumber, emailId} = action.payload;

        state.customerDetails.customerName = customerName;
        state.customerDetails.customerAddress = customerAddress;
        state.customerDetails.contactNumber = contactNumber;
        state.customerDetails.emailId = emailId;

        return state;
      }
        break;
    default:
      return initialState;
      break;

  }
}

function calculateAllTotalsForSingleEntity(item){
    item.totalCeilingArea = item.dimensions[0].total;
    item.totalExteriorArea = item.dimensions[5].total;
    item.totalWoodAndMetalArea = item.dimensions[4].total;
    var zeroTotal=0,twoTotal=0,oneTotal=0,threeTotal=0;
    zeroTotal = isNaN(parseFloat(item.dimensions[1].total)) ? 0 : parseFloat(item.dimensions[1].total);
    twoTotal = isNaN(parseFloat(item.dimensions[3].total)) ? 0 : parseFloat(item.dimensions[3].total);
    oneTotal = isNaN(parseFloat(item.dimensions[2].total)) ? 0 : parseFloat(item.dimensions[2].total);
    threeTotal = isNaN(parseFloat(item.dimensions[4].total)) ? 0 : parseFloat(item.dimensions[4].total);
    item.totalWallArea = (zeroTotal + twoTotal) - (oneTotal);
}

var newRoom = {
  entityName: 'Room Name',
  totalCeilingArea: '',
  totalExteriorArea: '',
  totalWallArea: '',
  totalWoodAndMetalArea: '',
  dimensions: [
    {
      type: 'addition',
      name: 'Ceiling',
      description: '',
      measurements: [{inputLength:'',inputBreadth:'',inputNumber:''},{inputLength:'',inputBreadth:'',inputNumber:''}],
      total: ''
    },
    {
      type: 'addition',
      name: 'Wall',
      description: '',
      measurements: [{inputLength:'',inputBreadth:'',inputNumber:''},{inputLength:'',inputBreadth:'',inputNumber:''}],
      total: ''
    },
    {
      type: 'deduction',
      name: 'Furniture and Opening, Doors and Grill',
      description: '',
      measurements: [{inputLength:'',inputBreadth:'',inputNumber:''},{inputLength:'',inputBreadth:'',inputNumber:''}],
      total: ''
    },
    {
      type: 'addition',
      name: 'Add Extras, Jam',
      description: '',
      measurements: [{inputLength:'',inputBreadth:'',inputNumber:''},{inputLength:'',inputBreadth:'',inputNumber:''}],
      total: ''
    },
    {
      type: 'addition',
      name: 'Doors and Grill (To paint)',
      description: '',
      measurements: [{inputLength:'',inputBreadth:'',inputNumber:''},{inputLength:'',inputBreadth:'',inputNumber:''}],
      total: ''
    },
    {
      type: 'addition',
      name: 'Exteriors',
      description: '',
      measurements: [{inputLength:'',inputBreadth:'',inputNumber:''},{inputLength:'',inputBreadth:'',inputNumber:''}],
      total: ''
    }
  ]
}
