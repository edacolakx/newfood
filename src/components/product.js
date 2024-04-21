import { View, Text } from 'react-native'
import React from 'react'

export default function Product(props) {
  return (
    <View>
      <Text style={{color:"black"}}>{props.isim}</Text>
    </View>
  )
}