import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Welcome from '../app/Auth/Welcome';
import SignIn from '../app/Auth/SignIn';
import Home from '../app/Main/Home';

export type RoutesNavigation = {
  Welcome: undefined;
  SignIn: undefined;
  Home: undefined;
};

const Stack = createNativeStackNavigator();

function App() {
  return (
    <>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
          name="Welcome"
          options={{headerShown: false}}
          component={Welcome}
        />
        <Stack.Screen
          name="SignIn"
          options={{headerShown: false}}
          component={SignIn}
        />
        <Stack.Screen
          name="Home"
          options={{headerShown: false}}
          component={Home}
        />
      </Stack.Navigator>
    </>
  );
}

export default App;
