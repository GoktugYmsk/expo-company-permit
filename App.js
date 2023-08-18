// App.js
import React, { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { store } from './app/store';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './components/login';
import SignUp from './components/signUp';
import Menu from './components/menu/menu';
import Home from './components/menu/home';
import Profile from './components/menu/profile';
import PermissionRequest from './components/permissionRequest';
import MyRequest from './components/permissionRequest/myRequest';
import Approval from './components/menu/approval';
import OffDuty from './components/menu/off-duty';
import { Platform } from "react-native";





const Stack = createStackNavigator();


const NavigationBar = () => {
  const isWeb = Platform.OS === "web";
  if (!isWeb) {
    return null;
  }

  // Web için gerekli NavigationBar içeriği
  return (
    // Burada NavigationBar bileşeninin içeriğini oluşturabilirsiniz
    <div style={{ background: "lightgrey", padding: "10px", left: 0 }}>
      Web Navigation Bar
    </div>
  );
};


export default function App() {

  return (
    <Provider store={store}>
      <NavigationBar />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="Menu" component={Menu} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="MyRequest" component={MyRequest} />
          <Stack.Screen name="PerRequest" component={PermissionRequest} />
          <Stack.Screen name="Approval" component={Approval} />
          <Stack.Screen name="OffDuty" component={OffDuty} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
