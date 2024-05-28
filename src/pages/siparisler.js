import { View, Text, FlatList , StyleSheet,Image, TouchableOpacity} from 'react-native'
import React from 'react'
import { Avatar } from 'react-native-paper';

export default function Siparisler({navigation}) {

  const veri=[{
    durum:1,
    id:1,
    adres:"Manavgat",
    siparistarih:"2024-05-27",
    tutar:300,
    urunler:[
      {
        isim:"Hamburger",
        fiyat:50,
        miktar:1,
        resim:""
      },
      {
        isim:"Patates Kızartması",
        fiyat:90,
        miktar:3,
        resim:""
      },
      {
        isim:"Kola",
        fiyat:40,
        miktar:3,
        resim:""
      },
    ],
    restorant:{
      isim:"Burger King",
      resim:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdL5VNlaSFdL4lImxjHTtq2ngkn2VRg_3845nlwQRcCQ&s"
    }
  },
  {
    durum:1,
    id:2,
    siparistarih:"2024-05-27",
    tutar:300,
    adres:"Antalya",
    urunler:[
      {
        isim:"Hamburger",
        fiyat:50,
        miktar:1,
        resim:""
      },
      {
        isim:"Patates Kızartması",
        fiyat:90,
        miktar:3,
        resim:""
      },
      {
        isim:"Kola",
        fiyat:40,
        miktar:3,
        resim:""
      },
    ],
    restorant:{
      isim:"Burger King",
      resim:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdL5VNlaSFdL4lImxjHTtq2ngkn2VRg_3845nlwQRcCQ&s"
    }
  }]


  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={()=>{navigation.navigate("SiparisdetayUser",{
      siparis:item
    })}}>

    <View style={styles.view}>
    <View >
    <Avatar.Image source={{uri:item.restorant.resim}} />
    </View>
    <View>
      <View style={{  flexDirection:"row"}}>
        <Text>{item.restorant.isim}</Text>
        <Text style={{color:"black",marginLeft:280}}>{item.tutar}</Text>
      </View>
      <Text>{item.siparistarih} tarihinde teslim edildi</Text>
      <FlatList data={item.urunler} renderItem={({item})=>(
        <Text style={{color:"black"}}>{item.isim} </Text>
      )} horizontal></FlatList>
      <Text></Text>
    </View>
    </View>
      </TouchableOpacity>
  );
  return (
    <View>
      <FlatList data={veri} renderItem={renderItem}/>
    </View>
  )
}

const styles = StyleSheet.create({
  view:{
    borderWidth:2,
    flexDirection:"row"
  }
})