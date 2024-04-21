import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import anasayfa from './src/pages/anasayfa';
import Anasayfa from './src/pages/anasayfa';
import Profil from './src/pages/profil';

const Stack=createNativeStackNavigator()
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='anasayfa' component={Anasayfa}></Stack.Screen>
        <Stack.Screen name='Profil' component={Profil}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default App;
