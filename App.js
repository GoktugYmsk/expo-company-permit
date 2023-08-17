// App.js
import React, { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
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

const Stack = createStackNavigator();

const Sidebar = ({ navigation }) => {
  return (
    <View style={styles.sidebar}>
      <TouchableOpacity
        style={styles.sidebarContainer}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.sidebarItem}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.sidebarContainer} onPress={() => navigation.navigate("Profile")}>
        <Text style={styles.sidebarItem}>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.sidebarContainer} onPress={() => navigation.navigate("MyRequest")}>
        <Text style={styles.sidebarItem}>My Request</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.sidebarContainer} onPress={() => navigation.navigate("PerRequest")}>
        <Text style={styles.sidebarItem}>Permission Request</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.sidebarContainer} onPress={() => navigation.navigate("Approval")}>
        <Text style={styles.sidebarItem}>Approval</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.sidebarContainer} onPress={() => navigation.navigate("OffDuty")}>
        <Text style={styles.sidebarItem}>Off Duty</Text>
      </TouchableOpacity>
    </View>
  );
};

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
                headerLeft: () => <Sidebar navigation={navigation} />,
              })}
            />
            <Stack.Screen
              name="Home"
              component={Home}
              options={({ navigation }) => ({
                headerTitle: "Home",
                headerLeft: () => <Sidebar navigation={navigation} />,
              })}
            />
            <Stack.Screen
              name="Profile"
              component={Profile}
              options={({ navigation }) => ({
                headerTitle: "Profile",
                headerLeft: () => <Sidebar navigation={navigation} />,
              })}
            />
            <Stack.Screen
              name="MyRequest"
              component={MyRequest}
              options={({ navigation }) => ({
                headerTitle: "My Request",
                headerLeft: () => <Sidebar navigation={navigation} />,
              })}
            />
            <Stack.Screen
              name="PerRequest"
              component={PermissionRequest}
              options={({ navigation }) => ({
                headerTitle: "Permission Request",
                headerLeft: () => <Sidebar navigation={navigation} />,
              })}
            />
            <Stack.Screen
              name="Approval"
              component={Approval}
              options={({ navigation }) => ({
                headerTitle: "Approval",
                headerLeft: () => <Sidebar navigation={navigation} />,
              })}
            />
            <Stack.Screen
              name="OffDuty"
              component={OffDuty}
              options={({ navigation }) => ({
                headerTitle: "Off Duty",
                headerLeft: () => <Sidebar navigation={navigation} />,
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

const styles = StyleSheet.create({
  sidebar: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
    height:'100%',
    marginTop:100
  },
  sidebarItem: {
    fontSize: 18,
    marginVertical: 16,
    color:'white',
    textAlign:'center',
    padding:4
  },
  sidebarContainer: {
    borderWidth: 2,
    borderColor: "white",
    backgroundColor:"#8754ce",
    borderRadius:4
  },
});
