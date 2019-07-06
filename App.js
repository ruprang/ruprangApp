import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {Routes} from './src/routes/Routes';
import mainReducer from './src/mainReducer'

const store = createStore(mainReducer);

export default class App extends Component{
  render() {
    return (
      <Provider store={store}>
        <Routes/>
      </Provider>
    );
  }
}
