// App.js
import React, { useEffect } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./app/store";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./components/login";
import SignUp from "./components/signUp";
import Menu from "./components/menu/menu";
import Home from "./components/menu/home";
import Profile from "./components/menu/profile";
import PermissionRequest from "./components/permissionRequest";
import MyRequest from "./components/permissionRequest/myRequest";
import Approval from "./components/menu/approval";
import OffDuty from "./components/menu/off-duty";
import {
  Platform,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import Sidebar from "./components/sidebar/Sidebar";

const Stack = createStackNavigator();



export default function App() {

  // useEffect(() => {
  //   if (localStorage.getItem('userToken')) {
  //     navigation.navigate('Home');
  //   } else {
  //     navigation.navigate('Login');
  //   }
  // }, [])


  if (Platform.OS === "web") {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUp}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Menu"
              component={Menu}
              options={({ navigation }) => ({
                headerTitle: "Menu",
                headerLeft: () => <Sidebar />,
              })}
            />
            <Stack.Screen
              name="Home"
              component={Home}
              options={({ navigation }) => ({
                headerTitle: "Home",
                headerLeft: () => <Sidebar />,
              })}
            />
            <Stack.Screen
              name="Profile"
              component={Profile}
              options={({ navigation }) => ({
                headerTitle: "Profile",
                headerLeft: () => <Sidebar />,
              })}
            />
            <Stack.Screen
              name="MyRequest"
              component={MyRequest}
              options={({ navigation }) => ({
                headerTitle: "My Request",
                headerLeft: () => <Sidebar />,
              })}
            />
            <Stack.Screen
              name="PerRequest"
              component={PermissionRequest}
              options={({ navigation }) => ({
                headerTitle: "Permission Request",
                headerLeft: () => <Sidebar />,
              })}
            />
            <Stack.Screen
              name="Approval"
              component={Approval}
              options={({ navigation }) => ({
                headerTitle: "Approval",
                headerLeft: () => <Sidebar />,
              })}
            />
            <Stack.Screen
              name="OffDuty"
              component={OffDuty}
              options={({ navigation }) => ({
                headerTitle: "Off Duty",
                headerLeft: () => <Sidebar />,
              })}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="Menu" component={Menu} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="MyRequest" component={MyRequest} />
          <Stack.Screen name="PerRequest" component={PermissionRequest} />
          <Stack.Screen name="Approval" component={Approval} />
          <Stack.Screen name="OffDuty" component={OffDuty} />
        </Stack.Navigator >
      </NavigationContainer >
    </Provider >
  );
}


