import { View, Text ,FlatList} from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper'
import Restorantcard from '../components/restorantcard';


export default function Anasayfa({navigation}) {
 
  const dataa = [
    {
      id: '10',
      title: 'First Item',
    },
    {
      id: '20',
      title: 'Second Item',
    },
    {
      id: '30',
      title: 'Third Item',
    },
  ]
const renderItem = ({ item }) => (
      <Restorantcard resname={item.title} min={item.id} navigation={navigation}/>
);
  return (
    <View>
      <FlatList data={dataa} renderItem={renderItem}></FlatList>
    </View>
  )
}