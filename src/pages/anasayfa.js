import { View, Text ,FlatList, TouchableOpacity, StyleSheet} from 'react-native'
import React, { useEffect, useState } from 'react'
import { Avatar, Button, Switch } from 'react-native-paper'
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
  const [dataa,setData] = useState()
const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  useEffect(() => {
    const sortedData = [...veri].sort((a, b) => 
      isEnabled ? a.min - b.min : b.min - a.min
    );
    setData(sortedData);
  }, [isEnabled]);
  console.log(dataa)
 const array=[]
 veri.forEach(function Ekle(item) {
  array.push(item.reskategori)
 })
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
        <Text style={{color:"black", textAlign:"center"}}>{item}</Text>
      </View>
  </TouchableOpacity>
);

  return (
    <View>
        <Text style={styles.text}>Kategoriler</Text>
      <View style={{height:100}}>
        <FlatList horizontal={true} data={tekOlanlar} renderItem={renderItemRes} ></FlatList>
      </View>
      <Text style={styles.text}>Restorantlar</Text>

      <View style={{flexDirection:"row-reverse"}}>
      <Text style={{color:isEnabled==true ? "#ffb9b9":"black",fontWeight:"bold"}}>Artan</Text>
      <Switch
        trackColor={{false: 'red', true: '#ffb9b9'}}
        thumbColor={isEnabled ? '#ffb9b9' : 'red'}
        onValueChange={toggleSwitch}
        value={isEnabled}
        />
        <Text style={{color:isEnabled==true ? "black":"red",fontWeight:"bold"}}>Azalan</Text>
        </View>
      <FlatList data={dataa} renderItem={renderItem}></FlatList>
    </View>
  )
}


const styles = StyleSheet.create({
  text:{
    fontSize:20,
    fontWeight:"bold",
    color:"black",
    marginBottom:3
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})