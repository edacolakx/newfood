import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { CHECK_USER, GET_RESTAURANT_BY_EMAIL, GET_URUNLER } from '../components/sorgular'
import { useSelector } from 'react-redux'
import { FlatList } from 'react-native'

export default function Yenideneme() {

  const { loading, error, data } = useQuery(GET_URUNLER);
useEffect(()=>{
  console.log("data",data.urunler)
  const filtered = data.urunler.filter((item) => item.restoran.id == 10)
  console.log(filtered)
},[])
  return (
    <View>
      <FlatList data={data.urunler} renderItem={({item})=>(
        <View>

        <Text style={{color:"black"}}>{item.name}</Text>
        <Text style={{color:"black"}}>{item.restoran.id}</Text>
        </View>
      )}></FlatList>
    </View>
  )
}