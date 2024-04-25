import { View, Text, FlatList } from 'react-native'
import React from 'react'
import Restorantcard from '../components/restorantcard'

export default function KategoriRestorant({route,navigation}) {
  const veri=[
    {
      restoran_name:"BurgerKing",
      resim:"https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Burger_King_2020.svg/300px-Burger_King_2020.svg.png",
      min:100,
      reskategori:"hamburger"
    },
    {
      restoran_name:"KFC",
      resim:"https://upload.wikimedia.org/wikipedia/tr/thumb/a/a5/Kentucky_Fried_Chicken_logo.svg/640px-Kentucky_Fried_Chicken_logo.svg.png",
      min:140,
      reskategori:"tavukburger"
    },
    {
      restoran_name:"Popeyes",
      resim:"https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Popeyes_logo.svg/1200px-Popeyes_logo.svg.png",
      min:130,
      reskategori:"tavukburger"
    },
  ]
  const {kategori}=route.params
  const filtrelenmisVeri = veri.filter(item => item.reskategori === kategori);
  console.log(filtrelenmisVeri)
  const renderItem = ({ item }) => (
    <Restorantcard restoran_name={item.restoran_name} min={item.min} resim={item.resim} navigation={navigation}/>
);
  return (
    <View>
      <FlatList data={filtrelenmisVeri} renderItem={renderItem}></FlatList>
    </View>
  )
}