import { View, Text ,FlatList, TouchableOpacity} from 'react-native'
import React from 'react'
import { Avatar, Button } from 'react-native-paper'
import Restorantcard from '../components/restorantcard';


export default function Anasayfa({navigation}) {
 
  
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

 const array=[]
 veri.forEach(function Ekle(item) {
  array.push(item.reskategori)
 })
 console.log(array)
 const tekOlanlar = array.filter((item, index) => {
  return array.indexOf(item) === index;
})

const renderItem = ({ item }) => (
      <Restorantcard restoran_name={item.restoran_name} min={item.min} resim={item.resim} navigation={navigation}/>
);
const renderItemRes = ({ item }) => (
  <TouchableOpacity onPress={()=>{navigation.navigate("KategoriRestorant",{kategori:item})}}>
      <View>
        <Avatar.Image source={{uri:"https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Popeyes_logo.svg/1200px-Popeyes_logo.svg.png"}}/>
        <Text style={{color:"black"}}>{item}</Text>
      </View>
  </TouchableOpacity>
);
  return (
    <View>
      <View style={{height:100}}>

        <FlatList horizontal={true} data={tekOlanlar} renderItem={renderItemRes} ></FlatList>
      </View>
      <Button onPress={()=>{navigation.navigate("Deneme")}}> Denemeye git</Button>
      <FlatList data={veri} renderItem={renderItem}></FlatList>
    </View>
  )
}