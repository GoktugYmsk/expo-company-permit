// App.js
import React from "react";
import { Platform } from "react-native";
import { Provider } from "react-redux";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { store } from "./app/store";

import Login from "./components/login";
import SignUp from "./components/signUp";
import Menu from "./components/menu/menu";
import Home from "./components/menu/home";
import Profile from "./components/menu/profile";
import OffDuty from "./components/menu/off-duty";
import Approval from "./components/menu/approval";
import Sidebar from "./components/sidebar/Sidebar";
import MyRequest from "./components/permissionRequest/myRequest";
import PermissionRequest from "./components/permissionRequest";

const Stack = createStackNavigator();

export default function App() {
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
  else {
    return (
      <Provider store={store}>
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
}

