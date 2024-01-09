import React from 'react';
import AppNavigator from './navigation/AppNavigator';
import {enableScreens} from 'react-native-screens';

enableScreens(false);

const App = () => {
  return <AppNavigator />;
};

export default App;
