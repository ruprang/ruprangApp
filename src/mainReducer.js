import {combineReducers} from 'redux';
import measurementReducer from './components/measurement/reducers/reducers';

const mainReducer = combineReducers({
  measurementReducer: measurementReducer
});

export default mainReducer
