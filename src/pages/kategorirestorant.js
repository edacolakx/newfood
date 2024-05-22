import { View, Text, FlatList } from 'react-native'
import React from 'react'
import Restorantcard from '../components/restorantcard'
import { GET_RESTAURANT } from '../components/sorgular';
import { useQuery } from '@apollo/client';

export default function KategoriRestorant({route,navigation}) {

  const {kategori,restoranlar}=route.params
  const filtrelenmisVeri = restoranlar.filter(item => item.category === kategori);
  
  const renderItem = ({ item }) => (
    <Restorantcard restoran_name={item.name} min={item.minTutar} resim={item.resim} navigation={navigation}/>
);
  return (
    <View>
      <FlatList data={filtrelenmisVeri} renderItem={renderItem}></FlatList>
    </View>
  )
}