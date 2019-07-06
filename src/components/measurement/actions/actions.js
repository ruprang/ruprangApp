export function addNewMeasurement(payload){
  return {
    type: 'ADD_NEW_DIMENSION',
    payload
  }
}

export function calculateTotal(payload){
  return {
    type: 'CALCULATE_TOTAL',
    payload
  }
}

export function addNewSection(payload){
  return {
    type: 'ADD_NEW_SECTION',
    payload
  }
}

export function updateRoomName(payload){
  return {
    type: 'UPDATE_ROOMNAME',
    payload
  }
}

export function updateDescription(payload){
  return {
    type: 'UPDATE_DESCRIPTION',
    payload
  }
}

export function addNewRoom(payload){
  return {
    type: 'ADD_NEW_ROOM',
    payload
  }
}

export function calculateGrandTotal(){
  return {
    type: 'CALCULATE_GRAND_TOTAL'
  }
}

export function updateGrandTotal(payload){
  return {
    type: 'UPDATE_GRAND_TOTAL',
    payload
  }
}

export function updateCustomerDetails(payload){
  return {
    type: 'UPDATE_CUSTOMER_DETAILS',
    payload
  }
}
