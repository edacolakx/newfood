import { View, Text, useWindowDimensions ,StyleSheet,TouchableOpacity} from 'react-native'
import React, { useState } from 'react'
import { FlatList } from 'react-native-gesture-handler'
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import { Badge, Button, Modal, Portal } from 'react-native-paper';
import { Icon } from '@rneui/themed';
import SiparisCard from './comps/sipariscard';


export default function AnasayfaRestorant({navigation}) {
  const veri=[
    {
      status:0,
      isim:"Eda Çolak",
      adres:"Çaybaşı, 1336. Sk. No:3, 07100 Muratpaşa/Antalya, Türkiye",
      siparisdetay:{
        fiyat:300
      },
      siparisurun:[
        {
        isim:"Hamburger",
        adet:2,
        not:"Turşu olmasın"
        },
        {
          isim:"Kola",
          adet:2,
          not:""
        }
      ]
    },
    {
      status:0,
      isim:"Eda Çolak",
      adres:"Çaybaşı, 1336. Sk. No:3, 07100 Muratpaşa/Antalya, Türkiye",
      siparisdetay:{
        fiyat:3342
      },
      siparisurun:[
        {
        isim:"Hamburger",
        adet:2,
        not:"Turşu olmasın"
        },
        {
          isim:"Kola",
          adet:2,
          not:""
        }
      ]
    },
    {
      status:1,
      isim:"Eda Çolak",
      adres:"Çaybaşı, 1336. Sk. No:3, 07100 Muratpaşa/Antalya, Türkiye",
      siparisdetay:{
        fiyat:500
      },
      siparisurun:[
        {
        isim:"Hamburger",
        adet:2,
        not:"Turşu olmasın"
        },
        {
          isim:"Kola",
          adet:2,
          not:""
        }
      ]
    },
    {
      status:2,
      isim:"Eda Çolak",
      adres:"Çaybaşı, 1336. Sk. No:3, 07100 Muratpaşa/Antalya, Türkiye",
      siparisdetay:{
        fiyat:45
      },
      siparisurun:[
        {
        isim:"Hamburger",
        adet:2,
        not:"Turşu olmasın"
        },
        {
          isim:"Kola",
          adet:2,
          not:""
        }
      ]
    },
    {
      status:2,
      isim:"Eda Çolak",
      adres:"Çaybaşı, 1336. Sk. No:3, 07100 Muratpaşa/Antalya, Türkiye",
      siparisdetay:{
        fiyat:368
      },
      siparisurun:[
        {
        isim:"Hamburger",
        adet:2,
        not:"Turşu olmasın"
        },
        {
          isim:"Kola",
          adet:2,
          not:""
        }
      ]
    },
  ]

  
  const renderItem=(({item})=>(
    <View>
      <SiparisCard siparisurun={item.siparisurun} status={item.status} isim={item.isim} adres={item.adres} siparisdetay={item.siparisdetay}></SiparisCard>
    </View>
  ))
  
  const statusZeroItems = veri.filter(item => item.status === 0);
  const statusOneItems = veri.filter(item => item.status === 1);
  const statusTwoItems = veri.filter(item => item.status === 2);
  const FirstRoute = () => (
    <View style={{ flex: 1}} >
      <FlatList data={statusZeroItems} renderItem={renderItem}></FlatList>

    </View>
  );
  
  const SecondRoute = () => (
    <View style={{ flex: 1 }} >
      <Button onPress={()=>{
        navigation.navigate("AddressToLatLng")
      }}>bas</Button>
            <FlatList data={statusOneItems} renderItem={renderItem}></FlatList>

    </View>
  );
  const ThirdRoute = () => (
    <View style={{ flex: 1 }} >
                  <FlatList data={statusTwoItems} renderItem={renderItem}></FlatList>

    </View>
  );
  
  
  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute
  })

    const [routes] = React.useState([
      { key: 'first', title: 'Tüm Siparişler' },
      { key: 'second', title: 'Onaylananlar' },
      { key: 'third', title: 'İptal Edilenler' }
    ]);
    const [index, setIndex] = React.useState(0);
    const layout = useWindowDimensions();
  
  return (
    <View style={{flex:1}}>
      <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      swipeEnabled={true}
      renderTabBar={props=>(
        <TabBar
        {...props}
        style={{backgroundColor:"#E72929"}}
        labelStyle={{fontSize:15}}
        ></TabBar>
      )}
    />
    </View>
  )
}

const styles = StyleSheet.create({
  view:{
    marginBottom:5,
    marginTop:5,
    backgroundColor:"#FFB9B9"
  },
  badge:{
    position: "relative", 
    top: 1, 
    left: 1, 
    backgroundColor: "#FFB9B9" 
  },
  view2:{
    marginBottom:10
  },
  modal:{
    flex:1,
    backgroundColor:"white",
    height:450,
    marginTop:150,
    width:330,
    marginLeft:30,
  }
})