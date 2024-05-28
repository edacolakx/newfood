import { View, Text , StyleSheet } from 'react-native'
import React from 'react'
import { Avatar } from 'react-native-paper'
import { FlatList } from 'react-native-gesture-handler'

export default function SiparisdetayUser({route}) {

    const {siparis} = route.params
    console.log(siparis)
  return (
    <View style={styles.view}>
        <Avatar.Image source={{uri:siparis.restorant.resim}} size={200} style={{alignSelf:"center"}}/>
        <Text style={{color:"black",fontSize:25}}>Sipariş Numarası #{siparis.id}</Text>    
        <Text style={{color:"black"}}>{siparis.siparistarih}</Text>    
        <Text style={{color:"black"}}>Siparişin verildiği yer: {siparis.restorant.isim}</Text>    
        <Text style={{color:"black"}}>Siparişin temsil edildiği yer: {siparis.adres}</Text>  

        <FlatList data={siparis.urunler} renderItem={({item})=>(
            <View>
                <Text>{item.isim}</Text>
            </View>
        )}/>    
        <Text style={{color:"black"}}>Toplam {siparis.tutar}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    view:{
        alignItems:"center"
    }
})