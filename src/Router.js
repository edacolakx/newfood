import 'react-native-gesture-handler';
import { View, Text } from 'react-native';
import React from 'react';
import { DrawerActions, NavigationContainer } from '@react-navigation/native';
import { Badge, BottomNavigation, Button, PaperProvider } from 'react-native-paper';
import Anasayfa from './pages/anasayfa';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Profil from './pages/profil';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider, useSelector } from 'react-redux';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Settings from './pages/settings';
import Login from './pages/login';
import Register from './pages/Register';
import Forgotpassword from './pages/forgotpassword';
import Restorantdetail from './pages/restorantdetail';
import Sepet from './pages/sepet';
import store from './redux/store';
import Index from './pages/kategorirestorant';
import KategoriRestorant from './pages/kategorirestorant';
import ProfilUpdate from './pages/profilupdate';
import AnasayfaRestorant from './restorantpages/anasayfa';
import ModalComponent from './components/modal';
import Itemcard from './components/itemcard';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Deneme from './pages/deneme';
import { ApolloProvider } from '@apollo/client';
import client from './client';
import Odeme from './pages/odeme';
import Siparisler from './pages/siparisler';
import Siparisdetay from './restorantpages/siparisdetay';
import AddressToLatLng from './restorantpages/rsdeneme';
import Rsprofil from './restorantpages/rsprofil';
import { Icon } from '@rneui/themed';
import Restoranregister from './pages/restoranregister';
import Denemee from './restorantpages/denemee';
import Profilupdateres from './restorantpages/profilupdate';
import Urunekle from './restorantpages/urunekle';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function Home() {
  const {genelResponse} = useSelector(state=>state)
  const stat=genelResponse.stat
  return (
    <>
    {
      stat =="müşteri" ? (
        <Tab.Navigator>
      <Tab.Screen name="Anasayfa" component={Anasayfa} options={{headerShown:false,tabBarIcon:({})=>(
        <Icon name='home-filled'></Icon>
      )}}  />
      <Tab.Screen name="Profil" component={ProfilUpdate} options={{headerShown:false,tabBarIcon:({})=>(
        <Icon name='person'></Icon>
      )}} />
      <Tab.Screen name="Sepet" component={Sepet} options={{headerShown:false,tabBarIcon:({})=>(
        <View style={{width:50,height:40}}>
        <Badge style={{ position: "absolute", top: 1, right: 1, backgroundColor: "#E72929" }} size={20}>{genelResponse.sepetmiktar}</Badge>
        <Icon name='landscape' style={{marginTop:10}}></Icon>
        </View>
      )}} />
    </Tab.Navigator>
      ):(
        <Tab.Navigator>
          <Tab.Screen name='AnasayfaRestorant' component={AnasayfaRestorant} options={{headerShown:false,tabBarIcon:({})=>(
        <Icon name='home-filled'></Icon>
      )}}></Tab.Screen>
          <Tab.Screen name='Rsprofil' component={Rsprofil} options={{headerShown:false,tabBarIcon:({})=>(
        <Icon name='person'></Icon>
      )}}></Tab.Screen>
          <Tab.Screen name='Urunekle' component={Urunekle} options={{headerShown:false,tabBarIcon:({})=>(
        <Icon name='add-to-queue'></Icon>
      )}}></Tab.Screen>
        </Tab.Navigator>
      )
    }
    </>
    
  );
}

function Root() {
  const {genelResponse} = useSelector(state=>state)
  const stat=genelResponse.stat

  return (
    <>
      {
        stat == "müşteri" ? (
          <Drawer.Navigator>
          <Drawer.Screen name="Yemek" component={Home} />
          <Drawer.Screen name="Settings" component={Settings} />
          <Drawer.Screen name="Siparisler" component={Siparisler} />
      </Drawer.Navigator>
        ):(
          <Drawer.Navigator>
          <Drawer.Screen name="Yemek" component={Home} />
          <Drawer.Screen name="Settings" component={Settings} />
          <Drawer.Screen name="Profilupdateres" component={Profilupdateres} />
          </Drawer.Navigator>
        )
      }
      </>
      
    
  );
}

export default function App() {

  return (
    <Provider store={store} >
<GestureHandlerRootView>
<ApolloProvider client={client}>

    <PaperProvider>
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
        <Stack.Screen name='Login' component={Login} options={{headerStyle:{backgroundColor:"#E21818"},headerTitleStyle:{color:"white"}}} />
        <Stack.Screen name='Register' component={Register}/>
        <Stack.Screen name='Forgotpassword' component={Forgotpassword}/>
        <Stack.Screen name='Restorant' component={Restorantdetail}/>
        <Stack.Screen name='Sepet' component={Sepet}/>
        <Stack.Screen name='KategoriRestorant' component={KategoriRestorant}/>
        <Stack.Screen name='ProfilUpdate' component={ProfilUpdate}/>
        <Stack.Screen name='AnasayfaRestorant' component={AnasayfaRestorant}/>
        <Stack.Screen name='Deneme' component={Deneme}/>
        <Stack.Screen name='Odeme' component={Odeme}/>
        <Stack.Screen name='Siparisler' component={Siparisler}/>
        <Stack.Screen name='Siparisdetay' component={Siparisdetay}/>
        <Stack.Screen name='AddressToLatLng' component={AddressToLatLng}/>
        <Stack.Screen name='Restoranregister' component={Restoranregister}/>
        <Stack.Screen name='Denemee' component={Denemee}/>
      </Stack.Navigator>
    </NavigationContainer>
          </PaperProvider>
          </ApolloProvider>
          </GestureHandlerRootView>
          </Provider>
  );
}
