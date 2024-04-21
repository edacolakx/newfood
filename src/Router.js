import 'react-native-gesture-handler';
import { View, Text } from 'react-native';
import React from 'react';
import { DrawerActions, NavigationContainer } from '@react-navigation/native';
import { BottomNavigation, Button, Provider } from 'react-native-paper';
import Anasayfa from './pages/anasayfa';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Profil from './pages/profil';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { createDrawerNavigator } from '@react-navigation/drawer';
import Settings from './pages/settings';
import Login from './pages/login';
import Register from './pages/Register';
import Forgotpassword from './pages/forgotpassword';
import Restorantdetail from './pages/restorantdetail';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function Home() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Anasayfa" component={Anasayfa} options={{headerShown:false}} />
      <Tab.Screen name="Profil" component={Profil} options={{headerShown:false}} />
      <Tab.Screen name="Settings" component={Settings} options={{headerShown:false}} />
    </Tab.Navigator>
  );
}

function Root() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Yemek Uygulaması" component={Home} />
      <Drawer.Screen name="Settings" component={Settings} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login' >
        <Stack.Screen
          name="Root"
          component={Root}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen name='Login' component={Login} options={{headerStyle:{backgroundColor:"#E21818"}}} />
        <Stack.Screen name='Register' component={Register}/>
        <Stack.Screen name='Forgotpassword' component={Forgotpassword}/>
        <Stack.Screen name='Restorantdetail' component={Restorantdetail}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
