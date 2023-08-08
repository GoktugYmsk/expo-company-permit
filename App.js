// App.js
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './components/login';
import SignUp from './components/signUp';
import Menu from './components/menu/menu';
import Home from './components/menu/home';
import PermissionRequest from './components/permissionRequest';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="Menu" component={Menu} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="PerRequest" component={PermissionRequest} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
