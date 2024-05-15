import { View, Text, FlatList,StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import Geocoder from 'react-native-geocoding';
import MapView, { Marker } from 'react-native-maps';

export default function Siparisdetay({route}) {

    const {isim,adres,siparisurun,siparisdetay} =  route.params


    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const API_KEY = "AIzaSyChaPLZWZcaMntXcfsAgdXfaKt4DF7PBkA";
  
    useEffect(() => {
      fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(adres)}&key=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
          if (data.results.length > 0) {
            const { lat, lng } = data.results[0].geometry.location;
            setLatitude(lat);
            setLongitude(lng);
          } else {
            console.error("Geocode API returned no results.");
          }
        })
        .catch(error => {
          console.error("Error fetching geocode data:", error);
        });
    }, []);

    const [selectedLocation, setSelectedLocation] = useState(null);

  return (
    <View>

        <Text>{isim}</Text>
<View style={{borderWidth:2,width:"90%",alignSelf:"center"}}>

      <FlatList data={siparisurun} renderItem={({item})=>(
        <View style={styles.view}>
          <View style={{flexDirection:"row"}}>
            <View>

            <Text style={{fontWeight:"bold",fontSize:20}}>{item.isim}</Text>
            <Text>{item.not==""?"Not yok":item.not}</Text>
            </View>
            <View style={{alignItems:"flex-end",flex:1}}>

            <Text style={{fontWeight:"bold",fontSize:20,marginRight:5}}>Adet: {item.adet}</Text>
            </View>
          </View>
            
        </View>
      )}></FlatList>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  view:{
    marginBottom:10
  }
})