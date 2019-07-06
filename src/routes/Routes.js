import React from 'react';
import { createStackNavigator } from 'react-navigation';
import Login from '../components/Login';
import Main from '../components/Main';
import MainAdmin from '../components/MainAdmin';
import Details from '../components/Details';
import Summary from '../components/Summary';
import ManagePaints from '../components/ManagePaints';
import ManageUsers from '../components/ManageUsers';
import AddUser from '../components/AddUser';
import AddPaint from '../components/AddPaint';
import ChangePassword from '../components/ChangePassword';
import Measurement from '../components/measurement/Measurement';

export const Routes = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
        header: null,
      }
  },
  Main: {
    screen: Main,
    navigationOptions: {
        header: null,
    }
  },
  Details: {
    screen: Details,
    navigationOptions: {
        title: 'Customer Details',
    }
  },
  Measurement: {
    screen: Measurement,
    navigationOptions: {
        title: 'Measurements',
    }
  },
  Summary: {
    screen: Summary,
    navigationOptions: {
        title: 'Summary',
    }
  },
  MainAdmin: {
    screen: MainAdmin,
    navigationOptions: {
        header: null,
    }
  },
  ChangePassword: {
    screen: ChangePassword,
    navigationOptions: {
        title: 'Change password',
    }
  },
  ManageUsers: {
    screen: ManageUsers,
    navigationOptions: {
        title: 'Manage users',
    }
  },
  ManagePaints: {
    screen: ManagePaints,
    navigationOptions: {
        title: 'Manage paints',
    }
  },
  AddUser: {
    screen: AddUser,
    navigationOptions: {
        title: 'Add User',
    }
  },
  AddPaint: {
    screen: AddPaint,
    navigationOptions: {
        title: 'Add Paint',
    }
  }
});

/*
react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/ && react-native run-android
*/

/*
info sheet

*/
