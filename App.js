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
import Ionicons from 'react-native-vector-icons/Ionicons';


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
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="MyRequest" component={MyRequest} />
          <Stack.Screen name="PerRequest" component={PermissionRequest} />
          <Stack.Screen name="Approval" component={Approval} />
          <Stack.Screen name="OffDuty" component={OffDuty} />
        </Stack.Navigator>

        <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'ios-information-circle'
                : 'ios-information-circle-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'ios-list' : 'ios-list-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
